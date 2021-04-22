Imports Microsoft.VisualBasic
Imports Microsoft.ApplicationBlocks.Data
Imports System.Data.SqlClient
Imports System.Data

Public Class DAL
    Dim conn As SqlConnection
    Dim Context As HttpContext = HttpContext.Current
    Public Sub New()
        conn = New SqlConnection(ConnectionString.ConnectionString)

    End Sub

    Public Function internsInsert_SignalR(
        ByVal product As String,ByVal email As String,
        ByVal quantity As String,ByVal phoneNumber As String,ByVal comment As String
        ) As DataSet
        Try
            Dim params() As SqlParameter = {New SqlParameter("@ProductName", product),
                                            New SqlParameter("@Email", email),
                                            New SqlParameter("@ProductQty", quantity),
                                            New SqlParameter("@Mobile", phoneNumber),
                                            New SqlParameter("@ProductMessage", comment)
                                            }
                                            
            ' INTERNS_ACTION is used to specify the name of the stored procedure
            Return SqlHelper.ExecuteDataset(conn, CommandType.StoredProcedure, "INSERT_PRODUCT", params)
        Catch ex As Exception
            BLL.WriteLog(ex.Message + " : " + ex.StackTrace)
            Return Nothing
        Finally
            conn.Close()
        End Try
    End Function

    
    Public Function fetchRecords() As DataSet
        Try
            Return SqlHelper.ExecuteDataset(conn, CommandType.StoredProcedure, "SELECT_PRODUCT")
        Catch ex As Exception
            BLL.WriteLog(ex.Message + " : " + ex.StackTrace)
            Return Nothing
        Finally
            conn.Close()
        End Try
    End Function
End Class
