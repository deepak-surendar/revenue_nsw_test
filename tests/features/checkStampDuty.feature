Feature: Motor vehicle registration stamp duty calculator tests

  Scenario Outline: Check Stamp Duty Calculation for Passenger vehicle
    Given I am on the Check Motor Vehicle Stamp Duty page
    When I click on Check online button 
    When I go to the Motor vehicle registration duty calculator page
    When I select Registration for passenger vehicle as Yes
    When I enter purchase price as <amount>
    When I click on Calculate button 
    Then I should see the stamp duty values successfully calculated in a popup for purchase price <amount>
    Then I close the popup

    Examples:
    | amount|
    | 5000  |
    | 25000 |