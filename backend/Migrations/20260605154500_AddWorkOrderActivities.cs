using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace backend.Migrations
{
    /// <inheritdoc />
    public partial class AddWorkOrderActivities : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.Sql("""
                IF OBJECT_ID(N'[WorkOrderActivities]', N'U') IS NULL
                BEGIN
                    CREATE TABLE [WorkOrderActivities] (
                        [Id] int NOT NULL IDENTITY,
                        [WorkOrderId] int NOT NULL,
                        [Message] nvarchar(max) NOT NULL,
                        [CreatedAt] datetime2 NOT NULL,
                        CONSTRAINT [PK_WorkOrderActivities] PRIMARY KEY ([Id]),
                        CONSTRAINT [FK_WorkOrderActivities_WorkOrders_WorkOrderId] FOREIGN KEY ([WorkOrderId]) REFERENCES [WorkOrders] ([Id]) ON DELETE CASCADE
                    );
                END

                IF COL_LENGTH(N'WorkOrderActivities', N'ChangedBy') IS NOT NULL
                    ALTER TABLE [WorkOrderActivities] DROP COLUMN [ChangedBy];

                IF COL_LENGTH(N'WorkOrderActivities', N'FieldChanged') IS NOT NULL
                    ALTER TABLE [WorkOrderActivities] DROP COLUMN [FieldChanged];

                IF COL_LENGTH(N'WorkOrderActivities', N'OldValue') IS NOT NULL
                    ALTER TABLE [WorkOrderActivities] DROP COLUMN [OldValue];

                IF COL_LENGTH(N'WorkOrderActivities', N'NewValue') IS NOT NULL
                    ALTER TABLE [WorkOrderActivities] DROP COLUMN [NewValue];

                IF NOT EXISTS (
                    SELECT 1
                    FROM sys.indexes
                    WHERE name = N'IX_WorkOrderActivities_WorkOrderId'
                      AND object_id = OBJECT_ID(N'[WorkOrderActivities]')
                )
                BEGIN
                    CREATE INDEX [IX_WorkOrderActivities_WorkOrderId]
                    ON [WorkOrderActivities] ([WorkOrderId]);
                END
                """);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "WorkOrderActivities");
        }
    }
}
