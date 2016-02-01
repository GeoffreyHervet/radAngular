<?php

namespace Rad\MagentoConfigBundle\Command;

use Rad\MagentoConfigBundle\Entity\CategoryArtshop;
use Rad\MagentoConfigBundle\Entity\Color;
use Rad\MagentoConfigBundle\Entity\CreativeDesigner;
use Rad\MagentoConfigBundle\Entity\Declinaison;
use Rad\MagentoConfigBundle\Entity\DesignPlace;
use Rad\MagentoConfigBundle\Entity\FashionAccount;
use Rad\MagentoConfigBundle\Entity\Gender;
use Rad\MagentoConfigBundle\Entity\Manufacturer;
use Rad\MagentoConfigBundle\Entity\Origin;
use Rad\MagentoConfigBundle\Entity\PrintingMethod;
use Rad\MagentoConfigBundle\Entity\Size;
use Rad\MagentoConfigBundle\Entity\SizeInfo;
use Rad\MagentoConfigBundle\Entity\Structure;
use Rad\MagentoConfigBundle\Entity\Support;
use Rad\MagentoConfigBundle\Entity\TextLang;
use Rad\MagentoConfigBundle\Entity\Typography;
use Rad\PageBundle\Traits\Timestamps;
use Symfony\Bundle\FrameworkBundle\Command\ContainerAwareCommand;
use Symfony\Component\Console\Input\InputArgument;
use Symfony\Component\Console\Input\InputInterface;
use Symfony\Component\Console\Input\InputOption;
use Symfony\Component\Console\Output\OutputInterface;

class ImportMagentoDataCommand extends ContainerAwareCommand
{
    protected function configure()
    {
        $this
            ->setName('rad:magentoconfiguration:magentodata')
            ->setDescription('Import magentodata to DB');
    }

    protected function execute(InputInterface $input, OutputInterface $output)
    {
        $manager = $this->getContainer()->get('doctrine')->getManager();

        $output->writeln('<comment>Category artshop:</comment>');
        $this->importCategoryArtshop();
        $output->writeln('<comment>Category Size info:</comment>');
        $this->importSizeInfo();
        $output->writeln('<comment>Manufacturer info:</comment>');
        $this->importManufacturer();
        foreach (array(
                     'genre'                => Gender::class,
                     'design_place'         => DesignPlace::class,
                     'structure'            => Structure::class,
                     'typography'           => Typography::class,
                     'text_lang'            => TextLang::class,
                     'origin'               => Origin::class,
                     'fashion_account'      => FashionAccount::class,
                     'creative_designer'    => CreativeDesigner::class,
                 ) as $magentoName => $class)
        {
            $output->writeln('<comment>Import '. $magentoName .':</comment>');
            $this->import($magentoName, $class);
        }

        $manager->flush();
    }

    public function import($tag, $class)
    {
        $manager = $this->getContainer()->get('doctrine')->getManager();

        foreach ($this->getContainer()->get('rad.magento.api')->call('raaad_catalog.configvalues', $tag) as $item) {
            $entity = $manager->getRepository($class)->findOneBy(array('magentoId' => $item['value']));
            if (!$entity) {
                $entity = new $class;
                $entity->setMagentoId($item['value']);
                $entity->setName($item['label']);
                echo 'Adding ... ', $entity, PHP_EOL;
                $manager->persist($entity);
            }
            else {
                echo 'Already added ... ', $item['label'], PHP_EOL;
            }
        }

        $manager->flush();
    }

    public function importSizeInfo()
    {
        $manager = $this->getContainer()->get('doctrine')->getManager();

        foreach ($this->getContainer()->get('rad.magento.api')->call('raaad_catalog.configvalues', 'size_info') as $item) {
            $entity = $manager->getRepository('RadMagentoConfigBundle:SizeInfo')->findOneBy(array('magentoId' => $item['value']));
            if (!$entity) {
                $entity = new SizeInfo();
                $entity->setMagentoId($item['value']);
                $entity->setName($item['label']);
                echo 'Adding ... ', $entity, PHP_EOL;
                $manager->persist($entity);
            }
            else {
                echo 'Already added ... ', $item['label'], PHP_EOL;
            }
        }

        $manager->flush();
    }

    public function importManufacturer()
    {
        $manager = $this->getContainer()->get('doctrine')->getManager();

        foreach ($this->getContainer()->get('rad.magento.api')->call('raaad_catalog.configvalues', 'manufacturer') as $item) {
            $entity = $manager->getRepository('RadMagentoConfigBundle:Manufacturer')->findOneBy(array('magentoId' => $item['value']));
            if (!$entity) {
                $entity = new Manufacturer();
                $entity->setMagentoId($item['value']);
                $entity->setName($item['label']);
                echo 'Adding ... ', $entity, PHP_EOL;
                $manager->persist($entity);
            }
            else {
                echo 'Already added ... ', $item['label'], PHP_EOL;
            }
        }

        $manager->flush();
    }

    public function importCategoryArtshop()
    {
        $manager = $this->getContainer()->get('doctrine')->getManager();

        foreach ($this->getContainer()->get('rad.magento.api')->call('raaad_catalog.configvalues', 'category_artshop') as $item) {
            $entity = $manager->getRepository('RadMagentoConfigBundle:CategoryArtshop')->findOneBy(array('magentoId' => $item['value']));
            if (!$entity) {
                $entity = new CategoryArtshop();
                $entity->setMagentoId($item['value']);
                $entity->setName($item['label']);
                echo 'Adding ... ', $entity, PHP_EOL;
                $manager->persist($entity);
            }
            else {
                echo 'Already added ... ', $item['label'], PHP_EOL;
            }
        }

        $manager->flush();
    }
}