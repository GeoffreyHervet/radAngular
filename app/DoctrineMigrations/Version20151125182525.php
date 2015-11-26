<?php

namespace Application\Migrations;

use Doctrine\DBAL\Migrations\AbstractMigration;
use Doctrine\DBAL\Schema\Schema;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
class Version20151125182525 extends AbstractMigration
{
    /**
     * @param Schema $schema
     */
    public function up(Schema $schema)
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->abortIf($this->connection->getDatabasePlatform()->getName() != 'mysql', 'Migration can only be executed safely on \'mysql\'.');

        $this->addSql('CREATE TABLE product (id INT AUTO_INCREMENT NOT NULL, support_id INT DEFAULT NULL, color_id INT DEFAULT NULL, printing_method_id INT DEFAULT NULL, bought_price NUMERIC(10, 2) NOT NULL, sell_price NUMERIC(10, 2) NOT NULL, artist_amount NUMERIC(10, 2) NOT NULL, created_at DATETIME NOT NULL, updated_at DATETIME NOT NULL, name VARCHAR(255) NOT NULL, INDEX IDX_D34A04AD315B405 (support_id), INDEX IDX_D34A04AD7ADA1FB5 (color_id), INDEX IDX_D34A04AD203BFB37 (printing_method_id), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8 COLLATE utf8_unicode_ci ENGINE = InnoDB');
        $this->addSql('CREATE TABLE product_country (product_id INT NOT NULL, country_id INT NOT NULL, INDEX IDX_82AAD2D64584665A (product_id), INDEX IDX_82AAD2D6F92F3E70 (country_id), PRIMARY KEY(product_id, country_id)) DEFAULT CHARACTER SET utf8 COLLATE utf8_unicode_ci ENGINE = InnoDB');
        $this->addSql('ALTER TABLE product ADD CONSTRAINT FK_D34A04AD315B405 FOREIGN KEY (support_id) REFERENCES support (id)');
        $this->addSql('ALTER TABLE product ADD CONSTRAINT FK_D34A04AD7ADA1FB5 FOREIGN KEY (color_id) REFERENCES color (id)');
        $this->addSql('ALTER TABLE product ADD CONSTRAINT FK_D34A04AD203BFB37 FOREIGN KEY (printing_method_id) REFERENCES printing_method (id)');
        $this->addSql('ALTER TABLE product_country ADD CONSTRAINT FK_82AAD2D64584665A FOREIGN KEY (product_id) REFERENCES product (id) ON DELETE CASCADE');
        $this->addSql('ALTER TABLE product_country ADD CONSTRAINT FK_82AAD2D6F92F3E70 FOREIGN KEY (country_id) REFERENCES country (id) ON DELETE CASCADE');
    }

    /**
     * @param Schema $schema
     */
    public function down(Schema $schema)
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->abortIf($this->connection->getDatabasePlatform()->getName() != 'mysql', 'Migration can only be executed safely on \'mysql\'.');

        $this->addSql('ALTER TABLE product_country DROP FOREIGN KEY FK_82AAD2D64584665A');
        $this->addSql('DROP TABLE product');
        $this->addSql('DROP TABLE product_country');
    }
}
