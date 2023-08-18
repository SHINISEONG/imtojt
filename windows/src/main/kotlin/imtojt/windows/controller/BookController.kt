package imtojt.windows.controller

import imtojt.common.model.dto.book.BookRequestDTO
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RequestParam
import org.springframework.web.bind.annotation.RestController

@RestController
@RequestMapping("books")
class BookController {
    @GetMapping("dto")
    fun getBookDTO(@RequestParam params: Map<String, String>) : BookRequestDTO {
        return BookRequestDTO(
            title = params["title"],
            price = params["price"]?.toInt(),
            author = params["author"],
            publisher = params["publisher"],
            isbn = params["isbn"]
        )
    }
}