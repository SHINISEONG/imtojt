package imtojt.windows.controller

import imtojt.common.model.dto.book.BookDTO
import imtojt.common.model.entity.BookEntity
import imtojt.core.domain.book.BookService
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.beans.factory.annotation.Value
import org.springframework.core.io.FileSystemResource
import org.springframework.http.HttpStatus
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.*
import org.springframework.web.multipart.MultipartFile
import java.nio.file.Paths
import org.springframework.core.io.ResourceLoader
import java.util.*

@RestController
@RequestMapping("api/books")
class BookController(private  val bookService: BookService) {


    @Autowired
    private lateinit var resourceLoader: ResourceLoader

    @Value("\${fileUploadPath}")
    lateinit var fileUploadPath: String

    @GetMapping("dto")
    fun getBookDTO(@RequestParam params: Map<String, String>) : BookDTO {
        return BookDTO(
            title = params["title"]!!,
            price = params["price"]?.toInt()!!,
            author = params["author"],
            publisher = params["publisher"],
            isbn = params["isbn"]!!,
            description = params["description"]!!,
            imageFileName = params["imagefilename"]!!,
            stock = params["stock"]?.toInt()!!
        )
    }

    @PostMapping("")
    fun saveBook(@ModelAttribute bookDTO: BookDTO, @RequestParam(value = "bookImage", required = false) multipartFile : MultipartFile) : ResponseEntity<BookEntity> {
        if (!multipartFile.isEmpty) {
            val ext: String? =
                multipartFile.originalFilename?.substring(multipartFile.originalFilename!!.lastIndexOf("."))

            val uuidFileName = UUID.randomUUID().toString() + ext
            val resource = FileSystemResource("C:/Users/hss27/IdeaProjects/imtojt/windows/src/main/resources/upload_images")
            val resourcePath = Paths.get(resource.uri)
            val targetPath = Paths.get(resourcePath.toString(), uuidFileName)
            multipartFile.transferTo(targetPath)

            bookDTO.imageFileName = uuidFileName;
        }
        val book = bookService.save(bookDTO)
        return ResponseEntity(book, HttpStatus.OK)
    }

    @GetMapping("")
    fun getBooks(): ResponseEntity<List<BookEntity>> {
        val books = bookService.findAll()
        return ResponseEntity(books, HttpStatus.OK)
    }

    @GetMapping("{id}")
    fun getBook(@PathVariable id: Long): ResponseEntity<BookEntity> {
        val book = bookService.findById(id)
        return ResponseEntity(book, HttpStatus.OK)
    }


    @PatchMapping("{id}")
    fun updateBook(@PathVariable id: Long, @ModelAttribute bookDTO: BookDTO, @RequestParam(value = "bookImage", required = false) multipartFile : MultipartFile?) : ResponseEntity<BookEntity> {
        if (multipartFile != null && !multipartFile.isEmpty) {
            val ext: String? =
                multipartFile.originalFilename?.substring(multipartFile.originalFilename!!.lastIndexOf("."))

            val uuidFileName = UUID.randomUUID().toString() + ext
            val resource = FileSystemResource("C:/Users/hss27/IdeaProjects/imtojt/windows/src/main/resources/upload_images")
            val resourcePath = Paths.get(resource.uri)
            val targetPath = Paths.get(resourcePath.toString(), uuidFileName)
            multipartFile.transferTo(targetPath)
            bookDTO.imageFileName = uuidFileName;
        }
            val updatedBook = bookService.update(id, bookDTO)
            return ResponseEntity(updatedBook, HttpStatus.OK)
    }

    @DeleteMapping("{id}")
    fun deleteBook(@PathVariable id: Long): ResponseEntity<Void>{
        bookService.delete(id)
        return ResponseEntity(HttpStatus.NO_CONTENT)
    }
}