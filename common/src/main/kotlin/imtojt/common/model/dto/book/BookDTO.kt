package imtojt.common.model.dto.book

import com.fasterxml.jackson.annotation.JsonProperty
import io.swagger.annotations.ApiModelProperty

data class BookDTO(
    @ApiModelProperty(value = "title", example = "meaning")
    @JsonProperty("TITLE")
    val title : String,

    @ApiModelProperty(value = "price", example = "20000")
    @JsonProperty("PRICE")
    val price : Int,

    @ApiModelProperty(value = "author", example = "victor")
    @JsonProperty("AUTHOR")
    val author : String? = null,

    @ApiModelProperty(value = "publisher", example = "chung")
    @JsonProperty("PUBLISHER")
    val publisher : String? = null,

    @ApiModelProperty(value = "ISBN", example = "978-3-16-148410-0")
    @JsonProperty("ISBN")
    val isbn : String,

    @ApiModelProperty(value = "image file name", example = "abc.jpg")
    @JsonProperty("IMAGE_FILE_NAME")
    var imageFileName : String?,

    @ApiModelProperty(value = "description", example = "this book is good. and ... ~~~")
    @JsonProperty("DESCRIPTION")
    val description : String,

    @ApiModelProperty(value = "stock", example = "3")
    @JsonProperty("STOCK")
    val stock : Int
)