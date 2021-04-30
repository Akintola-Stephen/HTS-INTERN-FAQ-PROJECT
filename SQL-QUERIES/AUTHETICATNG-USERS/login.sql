USE [FAQ_System]
GO
/****** Object:  StoredProcedure [dbo].[Validate_User_login]    Script Date: 30/04/2021 12:17:38 pm ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
ALTER PROCEDURE [dbo].[Validate_User_login]
	-- Add the parameters for the stored procedure here
	@username VARCHAR(50),
	@password VARCHAR(50)

AS
BEGIN
	-- SET NOCOUNT ON added to prevent extra result sets from
	-- interfering with SELECT statements.
	SET NOCOUNT ON;

	-- Insert statements for procedure here
	IF exists (SELECT *
	FROM SETUP_USER
	WHERE PASSWORD = @password
		AND USERNAME = @username
	)
	begin
		SELECT 'Login Success' As Status
		SELECT *
		FROM SETUP_USER
		WHERE USERNAME = @username
	end
	else
		SELECT 'Login Failed' As Status

END
