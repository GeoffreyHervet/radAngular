<?php

namespace Application\Migrations;

use Doctrine\DBAL\Migrations\AbstractMigration;
use Doctrine\DBAL\Schema\Schema;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
class Version20151202155334 extends AbstractMigration
{
    /**
     * @param Schema $schema
     */
    public function up(Schema $schema)
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->abortIf($this->connection->getDatabasePlatform()->getName() != 'mysql', 'Migration can only be executed safely on \'mysql\'.');

        $this->addSql('ALTER TABLE product CHANGE thumbnail thumbnail VARCHAR(255) DEFAULT NULL, CHANGE small_image small_image VARCHAR(255) DEFAULT NULL, CHANGE image image VARCHAR(255) DEFAULT NULL, CHANGE flat_image flat_image VARCHAR(255) DEFAULT NULL, CHANGE sku_begin sku_begin VARCHAR(255) DEFAULT NULL');
    }

    /**
     * @param Schema $schema
     */
    public function down(Schema $schema)
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->abortIf($this->connection->getDatabasePlatform()->getName() != 'mysql', 'Migration can only be executed safely on \'mysql\'.');

        $this->addSql('ALTER TABLE product CHANGE thumbnail thumbnail VARCHAR(255) NOT NULL COLLATE utf8_unicode_ci, CHANGE small_image small_image VARCHAR(255) NOT NULL COLLATE utf8_unicode_ci, CHANGE image image VARCHAR(255) NOT NULL COLLATE utf8_unicode_ci, CHANGE flat_image flat_image VARCHAR(255) NOT NULL COLLATE utf8_unicode_ci, CHANGE sku_begin sku_begin VARCHAR(255) NOT NULL COLLATE utf8_unicode_ci');
    }
}
