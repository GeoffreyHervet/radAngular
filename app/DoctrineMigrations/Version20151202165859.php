<?php

namespace Application\Migrations;

use Doctrine\DBAL\Migrations\AbstractMigration;
use Doctrine\DBAL\Schema\Schema;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
class Version20151202165859 extends AbstractMigration
{
    /**
     * @param Schema $schema
     */
    public function up(Schema $schema)
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->abortIf($this->connection->getDatabasePlatform()->getName() != 'mysql', 'Migration can only be executed safely on \'mysql\'.');

        $this->addSql('CREATE TABLE size_info (id INT AUTO_INCREMENT NOT NULL, created_at DATETIME NOT NULL, updated_at DATETIME NOT NULL, name VARCHAR(255) NOT NULL, magento_id INT NOT NULL, PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8 COLLATE utf8_unicode_ci ENGINE = InnoDB');
        $this->addSql('ALTER TABLE support ADD category_artshop_id INT DEFAULT NULL');
        $this->addSql('ALTER TABLE support ADD CONSTRAINT FK_8004EBA5DD8438DC FOREIGN KEY (category_artshop_id) REFERENCES category_artshop (id)');
        $this->addSql('CREATE INDEX IDX_8004EBA5DD8438DC ON support (category_artshop_id)');
        $this->addSql('DROP INDEX UNIQ_B0E3A12A4BC26BE3 ON category_artshop');
    }

    /**
     * @param Schema $schema
     */
    public function down(Schema $schema)
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->abortIf($this->connection->getDatabasePlatform()->getName() != 'mysql', 'Migration can only be executed safely on \'mysql\'.');

        $this->addSql('DROP TABLE size_info');
        $this->addSql('CREATE UNIQUE INDEX UNIQ_B0E3A12A4BC26BE3 ON category_artshop (magento_id)');
        $this->addSql('ALTER TABLE support DROP FOREIGN KEY FK_8004EBA5DD8438DC');
        $this->addSql('DROP INDEX IDX_8004EBA5DD8438DC ON support');
        $this->addSql('ALTER TABLE support DROP category_artshop_id');
    }
}
