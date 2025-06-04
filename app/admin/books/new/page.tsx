import Link from 'next/link'
import React from 'react'
import { Button } from '@/components/ui/button'
import BookForm from '@/components/admin/form/BookForm'

const BookNewPage = () => {
  return (
    <>
      <Button asChild className="back-btn">
        <Link href="/admin/books">Go Back</Link>
      </Button>

      <section className="w-full max-w-2xl">
        <BookForm type="create" />
      </section>
    </>
  );
}

export default BookNewPage
