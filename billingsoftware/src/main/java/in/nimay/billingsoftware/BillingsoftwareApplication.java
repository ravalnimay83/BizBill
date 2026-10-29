package in.nimay.billingsoftware;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;

@SpringBootApplication
@EnableJpaRepositories(basePackages = "in.nimay.billingsoftware")
public class BillingsoftwareApplication {

	public static void main(String[] args) {
		SpringApplication.run(BillingsoftwareApplication.class, args);
	}

}
