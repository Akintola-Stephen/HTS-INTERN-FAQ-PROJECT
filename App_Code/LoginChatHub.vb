Imports Microsoft.VisualBasic
Imports Microsoft.AspNet.SignalR
Imports Newtonsoft.Json
Imports Newtonsoft.Json.Linq
Imports System.Web.Script.Serialization
Imports System.Data
Imports System.IO
Imports System.Data.SqlClient
Imports System.Globalization
Imports System.Drawing

    Public Class LoginChatHub
        Inherits Hub
        Dim LoginDAL As New LoginDAL

        Public Function interns_Insert(
            ByVal username As String,
            ByVal password As String 
            ) As String
            
            Dim status As String = "ERROR"
            Dim dc_return As New Dictionary(Of String, Object)
            
            Try
                Dim ds As DataSet = LoginDAL.internsInsert_SignalR(username, password)
                Dim dt As DataTable = ds.Tables(0)
                dc_return.Add("RESULT", dt)
               ' dc_return.Add("ACTION_TYPE", ACTION_TYPE)
                status = "SUCCESS"
                
            Catch ex As Exception
                BLL.WriteLog(ex.Message + " : " + ex.StackTrace)
            End Try

            dc_return.Add("STATUS", status)
             Clients.All.broadcastrecords(JsonConvert.SerializeObject(dc_return))
            Return JsonConvert.SerializeObject(dc_return)
        End Function


        ' Public Function interns_Update(
        '     ByVal JSON_STRING As String,
        '     ByVal ACTION_TYPE As String  
        '     ) As String
            
        '     Dim status As String = "ERROR"
        '     Dim dc_return As New Dictionary(Of String, Object)
            
        '     Try
        '         Dim ds As DataSet = DAL.internsUpdate_SignalR(JSON_STRING, ACTION_TYPE)
        '         Dim dt As DataTable = ds.Tables(0)
        '         dc_return.Add("RESULT", dt)
        '         dc_return.Add("ACTION_TYPE", ACTION_TYPE)
        '         status = "SUCCESS"
                
        '     Catch ex As Exception
        '         BLL.WriteLog(ex.Message + " : " + ex.StackTrace)
        '     End Try

        '     dc_return.Add("STATUS", status)
        '      Clients.All.broadcastrecords(JsonConvert.SerializeObject(dc_return))
        '     Return JsonConvert.SerializeObject(dc_return)
        ' End Function


  


    End Class



