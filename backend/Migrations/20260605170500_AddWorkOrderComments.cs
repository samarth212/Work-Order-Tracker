using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace backend.Migrations
{
    /// <inheritdoc />
    public partial class AddWorkOrderComments : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.Sql("""
                IF OBJECT_ID(N'[WorkOrderComments]', N'U') IS NULL
                BEGIN
                    CREATE TABLE [WorkOrderComments] (
                        [Id] int NOT NULL IDENTITY,
                        [WorkOrderId] int NOT NULL,
                        [Author] nvarchar(max) NOT NULL,
                        [Message] nvarchar(max) NOT NULL,
                        [CreatedAt] datetime2 NOT NULL,
                        CONSTRAINT [PK_WorkOrderComments] PRIMARY KEY ([Id]),
                        CONSTRAINT [FK_WorkOrderComments_WorkOrders_WorkOrderId] FOREIGN KEY ([WorkOrderId]) REFERENCES [WorkOrders] ([Id]) ON DELETE CASCADE
                    );
                END

                IF NOT EXISTS (
                    SELECT 1
                    FROM sys.indexes
                    WHERE name = N'IX_WorkOrderComments_WorkOrderId'
                      AND object_id = OBJECT_ID(N'[WorkOrderComments]')
                )
                BEGIN
                    CREATE INDEX [IX_WorkOrderComments_WorkOrderId]
                    ON [WorkOrderComments] ([WorkOrderId]);
                END
                """);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "WorkOrderComments");
        }
    }
}
