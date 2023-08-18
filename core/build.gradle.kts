dependencies {
    api(project(":common"))
    allOpen {
        annotation("jakarta.persistence.Entity")
        annotation("jakarta.persistence.MappedSuperclass")
        annotation("jakarta.persistence.Embeddable")
    }
    api("org.springframework.boot:spring-boot-starter-data-jpa")
}