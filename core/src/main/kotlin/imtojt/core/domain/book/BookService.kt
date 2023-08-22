package imtojt.core.domain.book

import imtojt.common.model.dto.book.BookDTO
import imtojt.common.model.entity.BookEntity
import org.springframework.stereotype.Service
import kotlin.RuntimeException

@Service
class BookService(private val bookRepository: BookRepository) {

    fun save(bookDTO: BookDTO): BookEntity {
        val bookEntity = BookEntity(
            title = bookDTO.title,
            price = bookDTO.price,
            author = bookDTO.author,
            publisher = bookDTO.publisher,
            isbn = bookDTO.isbn,
            description = bookDTO.description,
            imageFileName = bookDTO.imageFileName,
            stock = bookDTO.stock
        )
        return bookRepository.save(bookEntity)
    }

    fun findAll(): List<BookEntity>{
        return bookRepository.findAll()
    }

    fun findById(id:Long): BookEntity {
        return bookRepository.findById(id).orElse(null)
    }



    fun update(id:Long, bookDTO: BookDTO): BookEntity{
        val book = bookRepository.findById(id).orElseThrow { RuntimeException("도서를 찾을 수 없습니다.") }
        book.title = bookDTO.title
        book.author = bookDTO.author
        book.price = bookDTO.price
        book.publisher = bookDTO.publisher

        if(bookDTO.imageFileName != null){
            book.imageFileName = bookDTO.imageFileName
        }

        book.stock = bookDTO.stock
        book.isbn = book.isbn
        return bookRepository.save(book)
    }

    fun delete(id:Long){
        bookRepository.deleteById(id)
    }
}

