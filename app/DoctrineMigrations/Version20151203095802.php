<?php

namespace Application\Migrations;

use Doctrine\DBAL\Migrations\AbstractMigration;
use Doctrine\DBAL\Schema\Schema;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
class Version20151203095802 extends AbstractMigration
{
    /**
     * @param Schema $schema
     */
    public function up(Schema $schema)
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->abortIf($this->connection->getDatabasePlatform()->getName() != 'mysql', 'Migration can only be executed safely on \'mysql\'.');

        $this->addSql('ALTER TABLE product ADD thumbnail_path VARCHAR(255) DEFAULT NULL, ADD small_image_path VARCHAR(255) DEFAULT NULL, ADD image_path VARCHAR(255) DEFAULT NULL, ADD flat_image_path VARCHAR(255) DEFAULT NULL, DROP thumbnail, DROP small_image, DROP image, DROP flat_image');
    }

    /**
     * @param Schema $schema
     */
    public function down(Schema $schema)
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->abortIf($this->connection->getDatabasePlatform()->getName() != 'mysql', 'Migration can only be executed safely on \'mysql\'.');

        $this->addSql('ALTER TABLE product ADD thumbnail VARCHAR(255) DEFAULT NULL COLLATE utf8_unicode_ci, ADD small_image VARCHAR(255) DEFAULT NULL COLLATE utf8_unicode_ci, ADD image VARCHAR(255) DEFAULT NULL COLLATE utf8_unicode_ci, ADD flat_image VARCHAR(255) DEFAULT NULL COLLATE utf8_unicode_ci, DROP thumbnail_path, DROP small_image_path, DROP image_path, DROP flat_image_path');
    }
}
