<?php

namespace Application\Migrations;

use Doctrine\DBAL\Migrations\AbstractMigration;
use Doctrine\DBAL\Schema\Schema;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
class Version20151124142331 extends AbstractMigration
{
    /**
     * @param Schema $schema
     */
    public function up(Schema $schema)
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->abortIf($this->connection->getDatabasePlatform()->getName() != 'mysql', 'Migration can only be executed safely on \'mysql\'.');

        $this->addSql('CREATE TABLE support (id INT AUTO_INCREMENT NOT NULL, art_shop_id INT NOT NULL, created_at DATETIME NOT NULL, updated_at DATETIME NOT NULL, name VARCHAR(255) NOT NULL, PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8 COLLATE utf8_unicode_ci ENGINE = InnoDB');
        $this->addSql('CREATE TABLE country (id INT AUTO_INCREMENT NOT NULL, magento_store_id INT NOT NULL, is_international TINYINT(1) NOT NULL, created_at DATETIME NOT NULL, updated_at DATETIME NOT NULL, name VARCHAR(255) NOT NULL, UNIQUE INDEX UNIQ_5373C966A966E61 (magento_store_id), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8 COLLATE utf8_unicode_ci ENGINE = InnoDB');
        $this->addSql('CREATE TABLE color (id INT AUTO_INCREMENT NOT NULL, hexa_color LONGTEXT DEFAULT NULL, created_at DATETIME NOT NULL, updated_at DATETIME NOT NULL, name VARCHAR(255) NOT NULL, PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8 COLLATE utf8_unicode_ci ENGINE = InnoDB');
        $this->addSql('CREATE TABLE size (id INT AUTO_INCREMENT NOT NULL, created_at DATETIME NOT NULL, updated_at DATETIME NOT NULL, name VARCHAR(255) NOT NULL, PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8 COLLATE utf8_unicode_ci ENGINE = InnoDB');
        $this->addSql('CREATE TABLE declinaison (id INT AUTO_INCREMENT NOT NULL, color_id INT DEFAULT NULL, size_id INT DEFAULT NULL, support_id INT DEFAULT NULL, created_at DATETIME NOT NULL, updated_at DATETIME NOT NULL, name VARCHAR(255) NOT NULL, INDEX IDX_1871D2A57ADA1FB5 (color_id), INDEX IDX_1871D2A5498DA827 (size_id), INDEX IDX_1871D2A5315B405 (support_id), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8 COLLATE utf8_unicode_ci ENGINE = InnoDB');
        $this->addSql('ALTER TABLE declinaison ADD CONSTRAINT FK_1871D2A57ADA1FB5 FOREIGN KEY (color_id) REFERENCES color (id)');
        $this->addSql('ALTER TABLE declinaison ADD CONSTRAINT FK_1871D2A5498DA827 FOREIGN KEY (size_id) REFERENCES size (id)');
        $this->addSql('ALTER TABLE declinaison ADD CONSTRAINT FK_1871D2A5315B405 FOREIGN KEY (support_id) REFERENCES support (id)');

        $this->addSql(<<<SQL
INSERT INTO `country` (`magento_store_id`, `is_international`, `created_at`, `updated_at`, `name`) VALUES
(1, 0, NOW(), NOW(), 'France'),
(2, 1, NOW(), NOW(), 'USA'),
(4, 1, NOW(), NOW(), 'UK'),
(5, 1, NOW(), NOW(), 'DE');
SQL
        );
    }

    /**
     * @param Schema $schema
     */
    public function down(Schema $schema)
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->abortIf($this->connection->getDatabasePlatform()->getName() != 'mysql', 'Migration can only be executed safely on \'mysql\'.');

        $this->addSql('ALTER TABLE declinaison DROP FOREIGN KEY FK_1871D2A5315B405');
        $this->addSql('ALTER TABLE declinaison DROP FOREIGN KEY FK_1871D2A57ADA1FB5');
        $this->addSql('ALTER TABLE declinaison DROP FOREIGN KEY FK_1871D2A5498DA827');
        $this->addSql('DROP TABLE support');
        $this->addSql('DROP TABLE country');
        $this->addSql('DROP TABLE color');
        $this->addSql('DROP TABLE size');
        $this->addSql('DROP TABLE declinaison');
    }
}
