<?php

namespace Application\Migrations;

use Doctrine\DBAL\Migrations\AbstractMigration;
use Doctrine\DBAL\Schema\Schema;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
class Version20151201180614 extends AbstractMigration
{
    /**
     * @param Schema $schema
     */
    public function up(Schema $schema)
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->abortIf($this->connection->getDatabasePlatform()->getName() != 'mysql', 'Migration can only be executed safely on \'mysql\'.');

        $this->addSql('CREATE TABLE design_color (id INT AUTO_INCREMENT NOT NULL, magento_id INT NOT NULL, created_at DATETIME NOT NULL, updated_at DATETIME NOT NULL, name VARCHAR(255) NOT NULL, PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8 COLLATE utf8_unicode_ci ENGINE = InnoDB');
        $this->addSql('ALTER TABLE product ADD design_color_id INT DEFAULT NULL, ADD online_date DATETIME NOT NULL, ADD special_price NUMERIC(10, 2) NOT NULL, ADD is_pretreated TINYINT(1) NOT NULL, ADD design_cost_category NUMERIC(10, 2) NOT NULL');
        $this->addSql('ALTER TABLE product ADD CONSTRAINT FK_D34A04ADA1F87DF3 FOREIGN KEY (design_color_id) REFERENCES design_color (id)');
        $this->addSql('CREATE INDEX IDX_D34A04ADA1F87DF3 ON product (design_color_id)');
    }

    /**
     * @param Schema $schema
     */
    public function down(Schema $schema)
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->abortIf($this->connection->getDatabasePlatform()->getName() != 'mysql', 'Migration can only be executed safely on \'mysql\'.');

        $this->addSql('ALTER TABLE product DROP FOREIGN KEY FK_D34A04ADA1F87DF3');
        $this->addSql('DROP TABLE design_color');
        $this->addSql('DROP INDEX IDX_D34A04ADA1F87DF3 ON product');
        $this->addSql('ALTER TABLE product DROP design_color_id, DROP online_date, DROP special_price, DROP is_pretreated, DROP design_cost_category');
    }
}
