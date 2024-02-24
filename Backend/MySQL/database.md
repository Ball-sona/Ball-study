# Database

## Location (MAC)

```
/usr/local/mysql/bin
```

## Users

### Login

```
mysql -u root -p
```

### Show Users

```sql
SELECT User, Host FROM mysql.user;
```

### Create User

```sql
CREATE USER 'someuser'@'localhost' IDENTIFIED BY 'somepassword';
```

### Delete User

```sql
DROP USER 'someuser'@'localhost';
```

## Grant

### Grant All Priveleges On All Databases

```sql
GRANT ALL PRIVILEGES ON * . * TO 'someuser'@'localhost';
FLUSH PRIVILEGES;
```

### Show Grants

```sql
SHOW GRANTS FOR 'someuser'@'localhost';
```

### Remove Grants

```sql
REVOKE ALL PRIVILEGES, GRANT OPTION FROM 'someuser'@'localhost';
```

## Database

### Show Databases

```sql
SHOW DATABASES
```

### Create Database

```sql
CREATE DATABASE acme;
```

### Delete Database

```sql
DROP DATABASE acme;
```

### Select Database

```sql
USE acme;
```

## Index

```sql
CREATE INDEX LIndex On users(location);
DROP INDEX LIndex ON users;
```
