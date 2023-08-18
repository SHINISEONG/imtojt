package imtojt

import org.springframework.boot.autoconfigure.SpringBootApplication
import org.springframework.boot.runApplication

@SpringBootApplication
class WindowsApplication

fun main(args: Array<String>) {
    runApplication<WindowsApplication>(*args)
}
