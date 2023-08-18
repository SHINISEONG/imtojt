dependencies {

    allOpen {
        annotation("jakarta.persistence.Entity")
        annotation("jakarta.persistence.MappedSuperclass")
        annotation("jakarta.persistence.Embeddable")
    }

    // https://mvnrepository.com/artifact/io.springfox/springfox-swagger-ui
    implementation("io.springfox:springfox-swagger-ui:2.9.2")
    // https://mvnrepository.com/artifact/io.swagger.core.v3/swagger-annotations
    implementation("io.swagger.core.v3:swagger-annotations:2.2.15")
    implementation("io.springfox:springfox-swagger2:2.9.2")

    api("org.springframework.boot:spring-boot-starter-data-jpa")

    runtimeOnly("com.h2database:h2")
}