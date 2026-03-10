Feature: API Task - Open API search user

  Scenario Outline: Fetch and validate user data from API
    Given I have a valid endpoint for the OpenLibrary author API
    When I submit request to fetch user data from API for "<username>"
    Then API response status is <expected_response_code>, success
    Then validate the response has personal name "<personal_name>"
    Then validate the response contains alternate name "<alternate_name>"

    Examples:
        | username | expected_response_code | personal_name | alternate_name             |
        | OL1A     | 200                    | Sachi Rautroy | Yugashrashta Sachi Routray |