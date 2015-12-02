<?php

namespace Application\Migrations;

use Doctrine\DBAL\Migrations\AbstractMigration;
use Doctrine\DBAL\Schema\Schema;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
class Version20151202174748 extends AbstractMigration
{
    /**
     * @param Schema $schema
     */
    public function up(Schema $schema)
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->abortIf($this->connection->getDatabasePlatform()->getName() != 'mysql', 'Migration can only be executed safely on \'mysql\'.');

        $this->addSql('ALTER TABLE support ADD size_info_id INT DEFAULT NULL, ADD description LONGTEXT NOT NULL');
        $this->addSql('ALTER TABLE support ADD CONSTRAINT FK_8004EBA5B8E61380 FOREIGN KEY (size_info_id) REFERENCES size_info (id)');
        $this->addSql('CREATE INDEX IDX_8004EBA5B8E61380 ON support (size_info_id)');
    }

    /**
     * @param Schema $schema
     */
    public function down(Schema $schema)
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->abortIf($this->connection->getDatabasePlatform()->getName() != 'mysql', 'Migration can only be executed safely on \'mysql\'.');

        $this->addSql('ALTER TABLE support DROP FOREIGN KEY FK_8004EBA5B8E61380');
        $this->addSql('DROP INDEX IDX_8004EBA5B8E61380 ON support');
        $this->addSql('ALTER TABLE support DROP size_info_id, DROP description');
    }
}
