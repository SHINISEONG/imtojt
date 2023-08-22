tasks.getByName("bootJar") {
    enabled = true
}

tasks.getByName("jar") {
    enabled = false
}

dependencies {
    api(project(":common"))
    api(project(":core"))
    implementation("org.springframework.boot:spring-boot-starter-web")
    implementation("com.h2database:h2")
    developmentOnly("org.springframework.boot:spring-boot-devtools")
}