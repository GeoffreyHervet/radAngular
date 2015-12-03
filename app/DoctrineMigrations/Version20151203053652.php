<?php

namespace Application\Migrations;

use Doctrine\DBAL\Migrations\AbstractMigration;
use Doctrine\DBAL\Schema\Schema;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
class Version20151203053652 extends AbstractMigration
{
    /**
     * @param Schema $schema
     */
    public function up(Schema $schema)
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->abortIf($this->connection->getDatabasePlatform()->getName() != 'mysql', 'Migration can only be executed safely on \'mysql\'.');

        $this->addSql('ALTER TABLE size_info CHANGE magento_id magento_id INT DEFAULT NULL');
        $this->addSql('ALTER TABLE design_color CHANGE magento_id magento_id INT DEFAULT NULL');
        $this->addSql('ALTER TABLE category CHANGE magento_id magento_id INT DEFAULT NULL');
        $this->addSql('ALTER TABLE attribute_set CHANGE magento_id magento_id INT DEFAULT NULL');
        $this->addSql('ALTER TABLE size CHANGE magento_id magento_id INT DEFAULT NULL');
        $this->addSql('ALTER TABLE category_artshop CHANGE magento_id magento_id INT DEFAULT NULL');
    }

    /**
     * @param Schema $schema
     */
    public function down(Schema $schema)
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->abortIf($this->connection->getDatabasePlatform()->getName() != 'mysql', 'Migration can only be executed safely on \'mysql\'.');

        $this->addSql('ALTER TABLE attribute_set CHANGE magento_id magento_id INT NOT NULL');
        $this->addSql('ALTER TABLE category CHANGE magento_id magento_id INT NOT NULL');
        $this->addSql('ALTER TABLE category_artshop CHANGE magento_id magento_id INT NOT NULL');
        $this->addSql('ALTER TABLE design_color CHANGE magento_id magento_id INT NOT NULL');
        $this->addSql('ALTER TABLE size CHANGE magento_id magento_id INT NOT NULL');
        $this->addSql('ALTER TABLE size_info CHANGE magento_id magento_id INT NOT NULL');
    }
}
