package imtojt.common.model.entity

import javax.persistence.*

@Entity
@Table(name = "books")
class Book(

    var title: String,

    var price: Int,

    var author: String? = null,

    var publisher: String? = null,

    @Id
    var isbn: String
)
