<?php

namespace Rad\MagentoConfigBundle\Command;

use Rad\MagentoConfigBundle\Entity\DesignColor;
use Symfony\Bundle\FrameworkBundle\Command\ContainerAwareCommand;
use Symfony\Component\Console\Input\InputInterface;
use Symfony\Component\Console\Output\OutputInterface;

class ImportDesignColorCommand extends ContainerAwareCommand
{
    protected function configure()
    {
        $this
            ->setName('rad:magentoconfiguration:importdesigncolor')
            ->setDescription('Import design color to database');
    }

    protected function getData()
    {
        return array(
            array('id' => 1, 'label' => '401 Poli-flex Premium folie, White'),
            array('id' => 2, 'label' => '402 Poli-flex Premium folie, Black'),
            array('id' => 3, 'label' => '406 Poli-flex Premium folie, Royal Blue'),
            array('id' => 4, 'label' => '420 Poli-flex Premium folie, Gold metallic'),
            array('id' => 5, 'label' => '461 Poli-flex Premium folie, Baby pink'),
            array('id' => 6, 'label' => '443 Poli-flex Premium folie, Neon pink'),
            array('id' => 7, 'label' => '405 Poli-flex Premium folie, Navy blue')
        );
    }

    protected function execute(InputInterface $input, OutputInterface $output)
    {
        /** @var  $manager */
        $manager = $this->getContainer()->get('doctrine')->getManager();
        foreach ($this->getData() as $value) {
            $item = $manager->getRepository('Rad\MagentoConfigBundle\Entity\DesignColor')->findOneByMagentoId($value['id']);
            if (!$item) {
                $item = new DesignColor();
                $item->setMagentoId($value['id']);
                $item->setName($value['label']);

                $manager->persist($item);
                $output->writeln('<info>Added  </info> ' . $item->getName());
            }
            else {
                $output->writeln('<comment>Already added  </comment> ' . $item->getName());
            }
        }

        $manager->flush();
    }
}