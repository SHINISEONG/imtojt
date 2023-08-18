package imtojt.windows.controller

import imtojt.common.model.dto.book.BookDTO
import imtojt.common.model.entity.BookEntity
import imtojt.core.domain.book.BookService
import org.springframework.http.HttpStatus
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.DeleteMapping
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.PatchMapping
import org.springframework.web.bind.annotation.PathVariable
import org.springframework.web.bind.annotation.PostMapping
import org.springframework.web.bind.annotation.RequestBody
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RequestParam
import org.springframework.web.bind.annotation.RestController

@RestController
@RequestMapping("api/books")
class BookController(private  val bookService: BookService) {
    @GetMapping("dto")
    fun getBookDTO(@RequestParam params: Map<String, String>) : BookDTO {
        return BookDTO(
            title = params["title"]!!,
            price = params["price"]?.toInt()!!,
            author = params["author"],
            publisher = params["publisher"],
            isbn = params["isbn"]!!,
            description = params["description"]!!,
            imageFileName = params["imagefilename"]!!
        )
    }

    @PostMapping("")
    fun saveBook(@RequestBody bookDTO: BookDTO) : ResponseEntity<BookEntity> {
        val book = bookService.save(bookDTO)
        return ResponseEntity.ok(book)
    }

    @GetMapping("{id}")
    fun getBook(@PathVariable id: Long): ResponseEntity<BookEntity> {
        val book = bookService.findById(id)
        return ResponseEntity(book, HttpStatus.OK)
    }

    @PatchMapping("{id}")
    fun updateBook(@PathVariable id: Long, @RequestBody bookDTO: BookDTO): ResponseEntity<BookEntity> {
        return try {
            val updatedBook = bookService.update(id, bookDTO)
            ResponseEntity(updatedBook, HttpStatus.OK)
        } catch (e: RuntimeException) {
            ResponseEntity(HttpStatus.NOT_FOUND)
        }
    }

    @DeleteMapping("{id}")
    fun deleteBook(@PathVariable id: Long): ResponseEntity<Void>{
        bookService.delete(id)
        return ResponseEntity(HttpStatus.NO_CONTENT)
    }
}