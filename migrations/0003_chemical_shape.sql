ALTER TABLE "borrow_records" ALTER COLUMN "due_date" SET DATA TYPE date;--> statement-breakpoint
ALTER TABLE "borrow_records" ALTER COLUMN "return_date" SET DATA TYPE date;--> statement-breakpoint
ALTER TABLE "borrow_records" ALTER COLUMN "return_date" DROP NOT NULL;