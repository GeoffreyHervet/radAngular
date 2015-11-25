<?php

namespace Application\Migrations;

use Doctrine\DBAL\Migrations\AbstractMigration;
use Doctrine\DBAL\Schema\Schema;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
class Version20151125182133 extends AbstractMigration
{
    /**
     * @param Schema $schema
     */
    public function up(Schema $schema)
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->abortIf($this->connection->getDatabasePlatform()->getName() != 'mysql', 'Migration can only be executed safely on \'mysql\'.');

        $this->addSql('CREATE TABLE printing_method (id INT AUTO_INCREMENT NOT NULL, created_at DATETIME NOT NULL, updated_at DATETIME NOT NULL, name VARCHAR(255) NOT NULL, PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8 COLLATE utf8_unicode_ci ENGINE = InnoDB');
        $this->addSql('DROP TABLE support_reference');
        $this->addSql('ALTER TABLE declinaison DROP FOREIGN KEY FK_1871D2A5315B405');
        $this->addSql('ALTER TABLE declinaison DROP FOREIGN KEY FK_1871D2A5498DA827');
        $this->addSql('ALTER TABLE declinaison DROP FOREIGN KEY FK_1871D2A57ADA1FB5');
        $this->addSql('DROP INDEX idx_1871d2a57ada1fb5 ON declinaison');
        $this->addSql('CREATE INDEX IDX_8E9AFFA17ADA1FB5 ON declinaison (color_id)');
        $this->addSql('DROP INDEX idx_1871d2a5498da827 ON declinaison');
        $this->addSql('CREATE INDEX IDX_8E9AFFA1498DA827 ON declinaison (size_id)');
        $this->addSql('DROP INDEX idx_1871d2a5315b405 ON declinaison');
        $this->addSql('CREATE INDEX IDX_8E9AFFA1315B405 ON declinaison (support_id)');
        $this->addSql('ALTER TABLE declinaison ADD CONSTRAINT FK_1871D2A5315B405 FOREIGN KEY (support_id) REFERENCES support (id)');
        $this->addSql('ALTER TABLE declinaison ADD CONSTRAINT FK_1871D2A5498DA827 FOREIGN KEY (size_id) REFERENCES size (id)');
        $this->addSql('ALTER TABLE declinaison ADD CONSTRAINT FK_1871D2A57ADA1FB5 FOREIGN KEY (color_id) REFERENCES color (id)');
    }

    /**
     * @param Schema $schema
     */
    public function down(Schema $schema)
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->abortIf($this->connection->getDatabasePlatform()->getName() != 'mysql', 'Migration can only be executed safely on \'mysql\'.');

        $this->addSql('CREATE TABLE support_reference (id INT AUTO_INCREMENT NOT NULL, color_id INT DEFAULT NULL, size_id INT DEFAULT NULL, support_id INT DEFAULT NULL, created_at DATETIME NOT NULL, updated_at DATETIME NOT NULL, name VARCHAR(255) NOT NULL COLLATE utf8_unicode_ci, INDEX IDX_1871D2A57ADA1FB5 (color_id), INDEX IDX_1871D2A5498DA827 (size_id), INDEX IDX_1871D2A5315B405 (support_id), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8 COLLATE utf8_unicode_ci ENGINE = InnoDB');
        $this->addSql('DROP TABLE printing_method');
        $this->addSql('ALTER TABLE declinaison DROP FOREIGN KEY FK_8E9AFFA17ADA1FB5');
        $this->addSql('ALTER TABLE declinaison DROP FOREIGN KEY FK_8E9AFFA1498DA827');
        $this->addSql('ALTER TABLE declinaison DROP FOREIGN KEY FK_8E9AFFA1315B405');
        $this->addSql('DROP INDEX idx_8e9affa17ada1fb5 ON declinaison');
        $this->addSql('CREATE INDEX IDX_1871D2A57ADA1FB5 ON declinaison (color_id)');
        $this->addSql('DROP INDEX idx_8e9affa1498da827 ON declinaison');
        $this->addSql('CREATE INDEX IDX_1871D2A5498DA827 ON declinaison (size_id)');
        $this->addSql('DROP INDEX idx_8e9affa1315b405 ON declinaison');
        $this->addSql('CREATE INDEX IDX_1871D2A5315B405 ON declinaison (support_id)');
        $this->addSql('ALTER TABLE declinaison ADD CONSTRAINT FK_8E9AFFA17ADA1FB5 FOREIGN KEY (color_id) REFERENCES color (id)');
        $this->addSql('ALTER TABLE declinaison ADD CONSTRAINT FK_8E9AFFA1498DA827 FOREIGN KEY (size_id) REFERENCES size (id)');
        $this->addSql('ALTER TABLE declinaison ADD CONSTRAINT FK_8E9AFFA1315B405 FOREIGN KEY (support_id) REFERENCES support (id)');
    }
}
