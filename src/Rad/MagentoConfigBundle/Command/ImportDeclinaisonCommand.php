<?php

namespace Rad\MagentoConfigBundle\Command;

use Rad\MagentoConfigBundle\Entity\Color;
use Rad\MagentoConfigBundle\Entity\Declinaison;
use Rad\MagentoConfigBundle\Entity\Size;
use Rad\MagentoConfigBundle\Entity\Support;
use Rad\PageBundle\Traits\Timestamps;
use Symfony\Bundle\FrameworkBundle\Command\ContainerAwareCommand;
use Symfony\Component\Console\Input\InputArgument;
use Symfony\Component\Console\Input\InputInterface;
use Symfony\Component\Console\Input\InputOption;
use Symfony\Component\Console\Output\OutputInterface;

class ImportDeclinaisonCommand extends ContainerAwareCommand
{
    protected function configure()
    {
        $this
            ->setName('rad:magentoconfiguration:importdeclinaison')
            ->setDescription('Import declinaison to database');
    }

    protected function getData()
    {
        $data = file_get_contents(__DIR__ . DIRECTORY_SEPARATOR . 'data-importdeclinaison.csv');
        $ret = explode(PHP_EOL, $data);
        // name,size,color,artshopCategoryId
        foreach ($ret as $key => $value) {
            $value = explode(',', $value);
            $ret[$key] = array(
                'name' => $value[0],
                'size' => $value[1],
                'color' => $value[2],
                'artshop' => $value[3]
            );
        }

        return $ret;
    }

    protected function execute(InputInterface $input, OutputInterface $output)
    {
        $i = 0;
        /** @var  $manager */
        $manager = $this->getContainer()->get('doctrine')->getManager();
        foreach ($this->getData() as $item) {
            if ($item['color'] == 'NULL') {
                continue;
            }
            $matches = explode('_', $item['name']);

            $size = $this->getSize(array_pop($matches), $item['size']);
            $color = $this->getColor(array_pop($matches), $item['color']);
            $support = $this->getSupport(implode('_', $matches), $item['artshop']);

            $decli = $manager->getRepository('Rad\MagentoConfigBundle\Entity\Declinaison')->findOneBy(array(
                'size'      => $size,
                'color'     => $color,
                'support'   => $support
            ));
            if (!$decli) {
                $declinaison = new Declinaison();
                $declinaison->setSize($size);
                $declinaison->setColor($color);
                $declinaison->setSupport($support);

                $manager->persist($declinaison);
//                if (!($i++ % 1)) {
                    $manager->flush();
//                }
                $output->writeln('<info>Added  </info> ' . $declinaison->getName());
            }
            else {
                $output->writeln('<comment>Already added  </comment> ' . $decli->getName());
            }
        }

        $manager->flush();

        $this->linkSizesToMagento();
    }


    protected function linkSizesToMagento()
    {
        $manager = $this->getContainer()->get('doctrine')->getManager();
        foreach ($this->getContainer()->get('rad.magento.api')->call('raaad_catalog.sizes') as $item) {
            /** @var Size $size */
            $size = $manager->getRepository('Rad\MagentoConfigBundle\Entity\Size')->findOneByShortName($item['label']);
            if ($size) {
                $size->setMagentoId($item['value']);
                echo 'Linked ', $size, PHP_EOL;
            }
        }

        $manager->flush();
    }

    /**
     * @param $colorCode
     * @param $coloreName
     * @return Size
     */
    protected function getSize($shortName, $longName)
    {
        static $cache = array();
        if (isset($cache[$shortName])) {
            return $cache[$shortName];
        }
        $manager = $this->getContainer()->get('doctrine')->getManager();
        $size = $manager->getRepository('Rad\MagentoConfigBundle\Entity\Size')->findOneBy(array(
            'shortName' => $shortName
        ));

        if (!$size) {
            $size = new Size();
            $size->setShortName($shortName);
            $size->setName($longName);

            $manager->persist($size);
        }

        $cache[$shortName] = $size;
        return $size;
    }

    /**
     * @param $colorCode
     * @param $coloreName
     * @return Color
     */
    protected function getColor($shortName, $longName)
    {
        static $cache = array();
        if (isset($cache[$shortName])) {
            return $cache[$shortName];
        }
        $manager = $this->getContainer()->get('doctrine')->getManager();
        $size = $manager->getRepository('Rad\MagentoConfigBundle\Entity\Color')->findOneBy(array(
            'shortName' => $shortName
        ));

        if (!$size) {
            $size = new Color();
            $size->setShortName($shortName);
            $size->setName($longName);

            $manager->persist($size);
        }

        $cache[$shortName] = $size;
        return $size;
    }

    /**
     * @param $name
     * @return Support
     */
    public function getSupport($name, $artShopId)
    {
        static $cache = array();
        if (isset($cache[$name])) {
            return $cache[$name];
        }
        $manager = $this->getContainer()->get('doctrine')->getManager();
        $support = $manager->getRepository('Rad\MagentoConfigBundle\Entity\Support')->findOneBy(array(
            'name' => $name
        ));

        if (!$support) {
            $support = new Support();
            $support->setName($name);
            $support->setArtShop($artShopId);

            $manager->persist($support);
        }

        $cache[$name] = $support;
        return $support;
    }
}