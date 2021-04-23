-- Create a new table called 'Roles' in schema 'SchemaName'
-- Drop the table if it already exists
IF OBJECT_ID('dbo.Roles', 'U') IS NOT NULL
DROP TABLE dbo.Roles
GO
-- Create the table in the specified schema
CREATE TABLE dbo.Roles
(
    RoleId INT IDENTITY(1,1) NOT NULL PRIMARY KEY, -- primary key column
    RoleName NVARCHAR(50) NOT NULL,
);
GO


DROP TABLE Roles
DROP TABLE users


-- Create a new table called 'users' in schema 'SchemaName'
-- Drop the table if it already exists
IF OBJECT_ID('dbo.users', 'U') IS NOT NULL
DROP TABLE dbo.users
GO
-- Create the table in the specified schema
CREATE TABLE dbo.users
(
    userId INT IDENTITY(1,1) NOT NULL PRIMARY KEY, -- primary key column
    Username NVARCHAR(50) NOT NULL,
    [Password] NVARCHAR(20) NOT NULL,
    CreatedDate DATETIME,
    RoleId INT,
    FOREIGN KEY (RoleId) REFERENCES Roles(RoleId) 
);
GO



-- DELETE FROM users
-- WHERE 
-- userId = 1;

SELECT * FROM users


INSERT INTO Roles (RoleName)
VALUES ('Support User'), ('Developer User')

SELECT * FROM Roles


INSERT INTO users (Username, [Password], CreatedDate, RoleId)
VALUES ('Tunmise', 'pa$$word321', GETDATE(), 1)


SELECT u.UserName, u.Password, r.RoleName
FROM users as u
LEFT JOIN Roles as r
ON u.userId = r.userId




-- Create a new table called 'mapping' in schema 'SchemaName'
-- Drop the table if it already exists
IF OBJECT_ID('SchemaName.mapping', 'U') IS NOT NULL
DROP TABLE dbo.mapping
GO
-- Create the table in the specified schema
CREATE TABLE dbo.mapping
(
    mappingId INT NOT NULL PRIMARY KEY, -- primary key column 
    userId INT ,
    RoleId INT,
    FOREIGN KEY (userId) REFERENCES users(userId),
    FOREIGN KEY (RoleId) REFERENCES Roles(RoleId)
    -- specify more columns here
);
GO


SELECT * FROM mapping



-- Create a new table called 'category' in schema 'SchemaName'
-- Drop the table if it already exists
IF OBJECT_ID('dbo.category', 'U') IS NOT NULL
DROP TABLE SchemaName.complaint_category
GO
-- Create the table in the specified schema
CREATE TABLE dbo.complaint_category
(
    complaint_categoryId INT IDENTITY(1,1) NOT NULL PRIMARY KEY, -- primary key column
    complaint_category_type [NVARCHAR](50) NOT NULL,
    complaint_category_created_date DATETIME
    -- specify more columns here
);
GO

-- DROP TABLE complaint_category


-- Create a new table called 'customer' in schema 'SchemaName'
-- Drop the table if it already exists
IF OBJECT_ID('dbo.customer', 'U') IS NOT NULL
DROP TABLE SchemaName.customer
GO
-- Create the table in the specified schema
CREATE TABLE dbo.customer
(
    customerId INT IDENTITY NOT NULL PRIMARY KEY, -- primary key column
    customer_name [NVARCHAR](50) NOT NULL,
    customer_mail [NVARCHAR](50) NOT NULL,
    complaintId INT NOT NULL,
    complaint_categoryId INT NOT NULL,
    FOREIGN KEY (complaint_categoryId) REFERENCES complaint_category(complaint_categoryId)
);
GO

SELECT * FROM customer

INSERT INTO complaint_category(complaint_category_type, complaint_category_created_date)
VALUES 
('DEPOSIT ISSUE', GETDATE()),
('WITHDRAWL ISSUE', GETDATE()),
('MONEY STUCK', GETDATE())

SELECT * FROM complaint_category