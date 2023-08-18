package imtojt.core.aop

import org.aspectj.lang.ProceedingJoinPoint
import org.aspectj.lang.annotation.Around
import org.aspectj.lang.annotation.Aspect
import org.springframework.stereotype.Component
import java.time.LocalDateTime
import java.time.format.DateTimeFormatter
import org.slf4j.Logger
import org.slf4j.LoggerFactory


@Component
@Aspect
class LoggingAspect{

    private val logger: Logger = LoggerFactory.getLogger(LoggingAspect::class.java)

    @Around("execution(* imtojt.core.domain.book.BookService.*(..))")
    fun logDatabaseActions(joinPoint: ProceedingJoinPoint): Any? {
        val methodName = joinPoint.signature.name
        val className = joinPoint.target::class.simpleName

        val currentDateTime = LocalDateTime.now().format(DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss"))

        logger.info("Executing $className.$methodName() at $currentDateTime")

        val startTime = System.currentTimeMillis()

        try {
            val result = joinPoint.proceed()

            val endTime = System.currentTimeMillis()
            val duration = endTime - startTime

            logger.info("$className.$methodName() executed successfully in $duration ms")
            return result
        } catch (e: Exception) {
            logger.error("Error executing $className.$methodName() \n :: Error tracking :: \n $e")

            throw e
        }
    }
}
