package imtojt.common.model.dto.book

import com.fasterxml.jackson.annotation.JsonProperty
import io.swagger.annotations.ApiModelProperty

data class BookRequestDTO(
    @ApiModelProperty(value = "title", example = "meaning")
    @JsonProperty("TITLE")
    val title : String? = null,

    @ApiModelProperty(value = "price", example = "20000")
    @JsonProperty("PRICE")
    val price : Int? = null,

    @ApiModelProperty(value = "author", example = "victor")
    @JsonProperty("AUTHOR")
    val author : String? = null,

    @ApiModelProperty(value = "publisher", example = "chung")
    @JsonProperty("PUBLISHER")
    val publisher : String? = null,

    @ApiModelProperty(value = "ISBN", example = "978-3-16-148410-0")
    @JsonProperty("ISBN")
    val isbn : String? = null,

)