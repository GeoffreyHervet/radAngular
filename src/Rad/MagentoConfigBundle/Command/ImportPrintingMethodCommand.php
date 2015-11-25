<?php

namespace Rad\MagentoConfigBundle\Command;

use Rad\MagentoConfigBundle\Entity\Color;
use Rad\MagentoConfigBundle\Entity\Declinaison;
use Rad\MagentoConfigBundle\Entity\PrintingMethod;
use Rad\MagentoConfigBundle\Entity\Size;
use Rad\MagentoConfigBundle\Entity\Support;
use Rad\PageBundle\Traits\Timestamps;
use Symfony\Bundle\FrameworkBundle\Command\ContainerAwareCommand;
use Symfony\Component\Console\Input\InputArgument;
use Symfony\Component\Console\Input\InputInterface;
use Symfony\Component\Console\Input\InputOption;
use Symfony\Component\Console\Output\OutputInterface;

class ImportPrintingMethodCommand extends ContainerAwareCommand
{
    protected function configure()
    {
        $this
            ->setName('rad:magentoconfiguration:importprintingmethod')
            ->setDescription('Import declinaison to database');
    }

    protected function getData()
    {
        return array(
            'Digital',
            'Embroidery',
            'Flock Foil',
            'Sublimation',
            'Flex Foil',
            'Printing',
            '3D Embroidery',
            'Transfer',
            'Patch Embroidery',
            'Application Embroidery'
        );
    }

    protected function execute(InputInterface $input, OutputInterface $output)
    {
        $i = 0;
        /** @var  $manager */
        $manager = $this->getContainer()->get('doctrine')->getManager();
        foreach ($this->getData() as $name) {
            $item = $manager->getRepository('Rad\MagentoConfigBundle\Entity\PrintingMethod')->findOneByName($name);
            if (!$item) {
                $item = new PrintingMethod();
                $item->setName($name);

                $manager->persist($item);
                if (!($i++ % 50)) {
                    $manager->flush();
                }
                $output->writeln('<info>Added  </info> ' . $item->getName());
            }
            else {
                $output->writeln('<comment>Already added  </comment> ' . $item->getName());
            }
        }

        $manager->flush();
    }
}