package imtojt.core.domain.book

import imtojt.common.model.entity.BookEntity
import org.springframework.data.jpa.repository.JpaRepository

interface BookRepository : JpaRepository<BookEntity, Long> {
    fun findByIsbn(isbn: String): BookEntity
    fun findByTitleContaining(title: String): List<BookEntity>
    fun findByAuthorContaining(author: String): List<BookEntity>
}
