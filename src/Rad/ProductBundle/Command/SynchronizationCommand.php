<?php

namespace Rad\ProductBundle\Command;

use Symfony\Bundle\FrameworkBundle\Command\ContainerAwareCommand;
use Symfony\Component\Console\Input\InputInterface;
use Symfony\Component\Console\Output\OutputInterface;

class SynchronizationCommand extends ContainerAwareCommand
{
    protected function configure()
    {
        $this
            ->setName('rad:product:synchronize')
            ->setDescription('Synchronize product to magento');
    }

    protected function execute(InputInterface $input, OutputInterface $output)
    {
        $products = $this->getContainer()->get('rad.product.synchronization')->process();
	if (!empty($products)) {
		foreach ($products as $product) {
			$output->writeln('Product synchronized: <info>'. $product .'</info>');
		}
	}
    }
}
