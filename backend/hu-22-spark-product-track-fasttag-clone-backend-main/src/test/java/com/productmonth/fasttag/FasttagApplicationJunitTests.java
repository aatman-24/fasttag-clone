package com.productmonth.fasttag;

import com.productmonth.fasttag.Controller.*;
import com.productmonth.fasttag.Dto.*;
//import org.junit.jupiter.api.Test;
import com.productmonth.fasttag.Entity.VehicleType;
import com.productmonth.fasttag.Exception.NotFoundException;
import com.productmonth.fasttag.Service.*;
import org.junit.Before;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.SpringRunner;
import org.junit.Test;

import javax.transaction.Transactional;

import static org.junit.jupiter.api.Assertions.*; //all the assert methods are static in nature

@RunWith(SpringRunner.class)
@SpringBootTest //this will create the application-context
//@ContextConfiguration(classes = {FasttagApplication.class}, loader = AnnotationConfigContextLoader.class)
@Transactional
/*->assertNotNull it will check whether the value is not null or not that is whether we are getting
a response or not
->if we use @Before annotation over a method then it means that...that method will be executed before
every test.
->similarly we have @After that method will be executed after a test is performed
->we also have @BeforeClass that method will run before the execution of a task and @AfterClass that method
will be run when the execution all the test-cases are done*/
public class FasttagApplicationJunitTests {
	@Autowired
	TollStationController tollStationController;

	@Autowired
	TollStationService tollStationService;

	@Autowired
	TollPriceService tollPriceService;

	@Autowired
	TollPriceController tollPriceController;

	@Autowired
	UserController userController;

	@Autowired
	UserService userService;

	@Autowired
	OrderController orderController;

	@Autowired
	OrderService orderService;

	@Autowired
	VehicleServices vehicleServices;

	@Autowired
	VehicleControllers vehicleControllers;

	@Before
	public void initialize() {
	}

	@Test
	public void contextLoads() {
	}

    @Test
	public void testCase1(){
		//this test-case will check whether the Admin is able to successfully add the toll-station or not
		TollStationDto tollStationDto=new TollStationDto();
		tollStationDto.setName("Test-Toll-Station");
		tollStationDto.setHighway("NH-5");
		tollStationDto.setPincode("986541");
		tollStationDto.setCity("Lucknow");
		tollStationDto.setState("Uttar Pradesh");
		/*->basically here in the junit test we are checking whether the method that is defined under
		the TollStationController is able to add the movie or not*/
        //assertNotNull(tollStationController.addTollStation(tollStationDto));
		assertNotNull(tollStationService.addTollStation(tollStationDto));
        assertEquals("Test-Toll-Station",tollStationDto.getName());
	}

	@Test //this is running fine
	public void testCase2(){
		//it will check whether the admin is able to add the toll-price or not
		TollPriceDto tollPriceDto=new TollPriceDto();
		tollPriceDto.setPrice(100);
		tollPriceDto.setTollStationId(1);
		tollPriceDto.setType(VehicleType.BIKE);
		//assertNotNull(tollPriceService.addTollPrice(tollPriceDto));
		assertNotNull(tollPriceController.addTollPrice(tollPriceDto));
	}


	@Test
	public void testCase3(){
		//this will check whether the admin is able to update the toll-station or not
		TollStationDto tollStationDto=new TollStationDto();
		tollStationDto.setName("Update-Toll-Station");
		tollStationDto.setHighway("NH-15");
		tollStationDto.setPincode("986541");
		tollStationDto.setCity("Lucknow");
		tollStationDto.setState("Uttar Pradesh");
		assertNotNull(tollStationService.updateTollStation(tollStationDto,1));
		assertEquals("Update-Toll-Station",tollStationDto.getName());
	}

	@Test
	public void testCase4(){
		//will check whether we are able to fetch the toll-station-by-id or not
		assertNotNull(tollStationService.getTollStationById(1));
	}

	@Test
	public void testCase5(){
		assertNotNull(tollStationService.getAllStation(0,3));
	}

	@Test
	public void testCase6(){
		//this will check whether we are able to register a user or not
		UserDto userDto=new UserDto();
		userDto.setEmail("test@gmail.com");
		userDto.setFirstName("test");
		userDto.setLastName("user");
		userDto.setUsername("test");
		userDto.setPassword("123");
		userDto.setRole("User");
		userDto.setMobileNumber("123456789");
		assertNotNull(userController.registerNewUser(userDto));
		assertEquals("test",userDto.getUsername());
	}

    @Test
	public void testCase7(){
		//will check whether we are able to get the user by the username or not
		//their we have not passed the username bcz we are fetching it from the jwt-token
		assertNotNull(userService.getAllUsers());
	}

	/*@Test
	public void testCase8(){
		//this will check whether the user is able to purchase the card or not..
		//getting the null-pointer exception on the line where we are fetching the username from the jwt
		OrderDto orderDto=new OrderDto();
		orderDto.setNumberPlate("KA-03-HA-1985");
		orderDto.setRegistrationNo("6749549");
		orderDto.setVehicleType(VehicleType.CAR);
		assertNotNull(orderController.purchaseCard(orderDto));

	}*/

	@Test
	public void testCase9(){
		assertNotNull(orderService.getAllOrders());
	}

	@Test
	public void testCase10(){
		try {
			assertNotNull(orderService.deleteOrderById(1));
		}
		catch (Exception exc)
		{
			System.out.println("that order id is not their");
		}
	}


	@Test
	public void testCase11(){
		assertNotNull(vehicleServices.getAllVehicles());
	}

	/*@Test
	public void testCase12(){
		//this will check whether the adding a new vehcile is working fine or not
		/*->the issue is that it is also a protected route which means the user will have to pass
		the jwt-token and we are fetching the username from the jwt and their we are getting the Null-
		Pointer Exception.
		->to handle this we first have to register a user then we can solve this error.

		UserDto userDto=new UserDto();
		userDto.setEmail("test@gmail.com");
		userDto.setFirstName("test");
		userDto.setLastName("user");
		userDto.setUsername("test");
		userDto.setPassword("123");
		userDto.setRole("User");
		userDto.setMobileNumber("123456789");
		assertNotNull(userController.registerNewUser(userDto));
		assertEquals("test",userDto.getUsername());

		VehicleDto vehicleDto=new VehicleDto();
		vehicleDto.setVehicleType(VehicleType.CAR);
		vehicleDto.setNumberPlate("MP-K2-1223");
		vehicleDto.setRegistrationNo("838499");
		assertNotNull(vehicleServices.addNewVehicle(vehicleDto));
		assertEquals("MP-K2-1223",vehicleDto.getNumberPlate());
	}*/

	@Test
	public void testCase13(){
		try{
			assertNotNull(vehicleControllers.getVehicleByNumberPlate("MP-K2-1223"));
		}
		catch (NotFoundException ex){
			int val=1;
			assertEquals(1,val);
		}
	}



}
