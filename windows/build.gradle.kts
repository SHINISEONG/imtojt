tasks.getByName("bootJar") {
    enabled = true
}

tasks.getByName("jar") {
    enabled = false
}

dependencies {
    api(project(":common"))
    implementation("org.springframework.boot:spring-boot-starter-web")
    implementation("com.h2database:h2")

}