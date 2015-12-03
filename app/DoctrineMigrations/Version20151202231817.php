<?php

namespace Application\Migrations;

use Doctrine\DBAL\Migrations\AbstractMigration;
use Doctrine\DBAL\Schema\Schema;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
class Version20151202231817 extends AbstractMigration
{
    /**
     * @param Schema $schema
     */
    public function up(Schema $schema)
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->abortIf($this->connection->getDatabasePlatform()->getName() != 'mysql', 'Migration can only be executed safely on \'mysql\'.');

        $this->addSql('DROP INDEX UNIQ_C0B739CA4BC26BE3 ON design_color');
        $this->addSql('DROP INDEX UNIQ_64C19C14BC26BE3 ON category');
        $this->addSql('ALTER TABLE color ADD description LONGTEXT NOT NULL');
        $this->addSql('DROP INDEX UNIQ_D01EB0634BC26BE3 ON attribute_set');
    }

    /**
     * @param Schema $schema
     */
    public function down(Schema $schema)
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->abortIf($this->connection->getDatabasePlatform()->getName() != 'mysql', 'Migration can only be executed safely on \'mysql\'.');

        $this->addSql('CREATE UNIQUE INDEX UNIQ_D01EB0634BC26BE3 ON attribute_set (magento_id)');
        $this->addSql('CREATE UNIQUE INDEX UNIQ_64C19C14BC26BE3 ON category (magento_id)');
        $this->addSql('ALTER TABLE color DROP description');
        $this->addSql('CREATE UNIQUE INDEX UNIQ_C0B739CA4BC26BE3 ON design_color (magento_id)');
    }
}
