<?php

namespace Rad\MagentoConfigBundle\Command;

use Rad\MagentoConfigBundle\Entity\CategoryArtshop;
use Rad\MagentoConfigBundle\Entity\Color;
use Rad\MagentoConfigBundle\Entity\Declinaison;
use Rad\MagentoConfigBundle\Entity\Gender;
use Rad\MagentoConfigBundle\Entity\Manufacturer;
use Rad\MagentoConfigBundle\Entity\PrintingMethod;
use Rad\MagentoConfigBundle\Entity\Size;
use Rad\MagentoConfigBundle\Entity\SizeInfo;
use Rad\MagentoConfigBundle\Entity\Support;
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
        $output->writeln('<comment>Gender info:</comment>');
        $this->importGender();

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


    public function importGender()
    {
        $manager = $this->getContainer()->get('doctrine')->getManager();

        foreach ($this->getContainer()->get('rad.magento.api')->call('raaad_catalog.configvalues', 'genre') as $item) {
            $entity = $manager->getRepository('RadMagentoConfigBundle:Gender')->findOneBy(array('magentoId' => $item['value']));
            if (!$entity) {
                $entity = new Gender();
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