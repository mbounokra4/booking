FROM php:8.2-apache

# Install system dependencies
RUN apt-get update && apt-get install -y \
    git unzip libicu-dev libzip-dev libonig-dev libxml2-dev \
    && docker-php-ext-install intl pdo pdo_mysql zip opcache

# Enable Apache Rewrite
RUN a2enmod rewrite

# Force Symfony to run in prod BEFORE copying the code
ENV APP_ENV=prod
ENV APP_DEBUG=0
ENV SYMFONY_SKIP_ENV_CHECK=1
ENV SYMFONY_DOTENV_VARS=1

WORKDIR /var/www/html
COPY backend/ /var/www/html/

COPY --from=composer:2 /usr/bin/composer /usr/bin/composer

RUN composer install --no-dev --optimize-autoloader --no-scripts

RUN mkdir -p var && chown -R www-data:www-data var

RUN sed -i 's|/var/www/html|/var/www/html/public|g' /etc/apache2/sites-available/000-default.conf

RUN printf "<Directory /var/www/html/>\n    AllowOverride All\n</Directory>\n" \
    > /etc/apache2/conf-available/symfony.conf \
    && a2enconf symfony

CMD ["apache2-foreground"]
