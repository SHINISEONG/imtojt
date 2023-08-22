package imtojt.config

import org.springframework.context.annotation.Bean
import org.springframework.context.annotation.Configuration
import org.springframework.web.client.RestTemplate
import org.springframework.web.servlet.config.annotation.CorsRegistry
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer

//Context Package에 위치하여야한다.(당연히 와이어링이 되어야 하기때문에)
//Configuration Annotation을 통해 메타데이터를 설정한다. XML을 대체, 메소드기반
@Configuration
class WebConfig : WebMvcConfigurer {
    //반드시 WebMvcConfigurer를 구현하고 있어야한다.

    //Cors설정을 위해 CorsMappings 메소드를 오버라이딩한다.
    override fun addCorsMappings(registry: CorsRegistry) {
        //파라메터인 CorsRegistry클래스의 메소드를 통해 메타데이터를 설정한다.
        registry
            .addMapping("/api/**") //Controller Mapping Path에 따라 CORS 허용/불허
            .allowedOrigins("http://localhost:5173")
//            .allowedOriginPatterns("http://*:*", "https://*:*") //ORIGIN URL에 따라 CORS 허용/불허
            .allowedMethods("*") //Request 메소드에 따라 CORS 허용/불허
            .allowedHeaders("*") //헤더 설정에 따라 CORS 허용/불허
            .allowCredentials(true)
        //<client-sever에서 withCredentials: true를 허가한다.
        //withCredentials: true 옵션 사용시, Response에 JSESSIONID정보를 담은 쿠키를 내려보낸다.
    }


}