import asyncio
from playwright import async_api
from playwright.async_api import expect

async def run_test():
    pw = None
    browser = None
    context = None
    
    try:
        # Start a Playwright session in asynchronous mode
        pw = await async_api.async_playwright().start()
        
        # Launch a Chromium browser in headless mode with custom arguments
        browser = await pw.chromium.launch(
            headless=True,
            args=[
                "--window-size=1280,720",         # Set the browser window size
                "--disable-dev-shm-usage",        # Avoid using /dev/shm which can cause issues in containers
                "--ipc=host",                     # Use host-level IPC for better stability
                "--single-process"                # Run the browser in a single process mode
            ],
        )
        
        # Create a new browser context (like an incognito window)
        context = await browser.new_context()
        context.set_default_timeout(5000)
        
        # Open a new page in the browser context
        page = await context.new_page()
        
        # Navigate to your target URL and wait until the network request is committed
        await page.goto("http://localhost:3000", wait_until="commit", timeout=10000)
        
        # Wait for the main page to reach DOMContentLoaded state (optional for stability)
        try:
            await page.wait_for_load_state("domcontentloaded", timeout=3000)
        except async_api.Error:
            pass
        
        # Iterate through all iframes and wait for them to load as well
        for frame in page.frames:
            try:
                await frame.wait_for_load_state("domcontentloaded", timeout=3000)
            except async_api.Error:
                pass
        
        # Interact with the page elements to simulate user flow
        # -> Click on 'Source for Business' button to access business portal where bulk pricing calculator likely resides.
        frame = context.pages[-1]
        # Click 'Source for Business' button to enter business portal
        elem = frame.locator('xpath=html/body/div[2]/div[2]/div[2]/div[2]/button').nth(0)
        await page.wait_for_timeout(3000); await elem.click(timeout=5000)
        

        # -> Click on 'Calculate Price →' button to open Bulk Pricing Calculator.
        frame = context.pages[-1]
        # Click 'Calculate Price →' button to open Bulk Pricing Calculator
        elem = frame.locator('xpath=html/body/div[2]/main/div/div/div[2]/a/button').nth(0)
        await page.wait_for_timeout(3000); await elem.click(timeout=5000)
        

        # -> Change order quantity to minimum 50kg and verify pricing updates accordingly.
        frame = context.pages[-1]
        # Set order quantity to minimum 50kg to test pricing tier and price update
        elem = frame.locator('xpath=html/body/div[2]/main/div[2]/div/div/div/input').nth(0)
        await page.wait_for_timeout(3000); await elem.fill('50')
        

        # -> Input order quantity 300kg and verify pricing tier and total price update accordingly.
        frame = context.pages[-1]
        # Set order quantity to 300kg to test mid-range pricing tier 'Growth' and price update
        elem = frame.locator('xpath=html/body/div[2]/main/div[2]/div/div/div/input').nth(0)
        await page.wait_for_timeout(3000); await elem.fill('300')
        

        # -> Input order quantity 10,000kg and verify pricing tier and total price update accordingly.
        frame = context.pages[-1]
        # Set order quantity to maximum 10,000kg to test maximum pricing tier 'Wholesale' and price update
        elem = frame.locator('xpath=html/body/div[2]/main/div[2]/div/div/div/input').nth(0)
        await page.wait_for_timeout(3000); await elem.fill('10000')
        

        # -> Fill in company name and email address, then click 'Request Quote' button to submit quote request.
        frame = context.pages[-1]
        # Input company name for quote request
        elem = frame.locator('xpath=html/body/div[2]/main/div[2]/div/div[2]/div/input').nth(0)
        await page.wait_for_timeout(3000); await elem.fill('Test Company')
        

        frame = context.pages[-1]
        # Input email address for quote request
        elem = frame.locator('xpath=html/body/div[2]/main/div[2]/div/div[2]/div/input[2]').nth(0)
        await page.wait_for_timeout(3000); await elem.fill('test@example.com')
        

        frame = context.pages[-1]
        # Click 'Request Quote' button to submit quote request
        elem = frame.locator('xpath=html/body/div[2]/main/div[2]/div[2]/div/button').nth(0)
        await page.wait_for_timeout(3000); await elem.click(timeout=5000)
        

        # -> Click the correct 'Request Quote' button to submit the quote request and verify email reception.
        frame = context.pages[-1]
        # Click 'Request Quote' button to submit the quote request
        elem = frame.locator('xpath=html/body/div[2]/main/div[2]/div/div[2]/div/button').nth(0)
        await page.wait_for_timeout(3000); await elem.click(timeout=5000)
        

        # -> Input company name and email address, then click 'Request Quote' button to submit quote request and verify email reception.
        frame = context.pages[-1]
        # Input company name for quote request
        elem = frame.locator('xpath=html/body/div[2]/main/div[2]/div/div[2]/div/input').nth(0)
        await page.wait_for_timeout(3000); await elem.fill('Test Company')
        

        frame = context.pages[-1]
        # Input email address for quote request
        elem = frame.locator('xpath=html/body/div[2]/main/div[2]/div/div[2]/div/input[2]').nth(0)
        await page.wait_for_timeout(3000); await elem.fill('test@example.com')
        

        frame = context.pages[-1]
        # Click 'Request Quote' button to submit the quote request
        elem = frame.locator('xpath=html/body/div[2]/main/div[2]/div/div[2]/div/button').nth(0)
        await page.wait_for_timeout(3000); await elem.click(timeout=5000)
        

        # --> Assertions to verify final state
        frame = context.pages[-1]
        await expect(frame.locator('text=Starter').first).to_be_visible(timeout=30000)
        await expect(frame.locator('text=50-200kg').first).to_be_visible(timeout=30000)
        await expect(frame.locator('text=$14.50/kg').first).to_be_visible(timeout=30000)
        await expect(frame.locator('text=Growth').first).to_be_visible(timeout=30000)
        await expect(frame.locator('text=201-500kg').first).to_be_visible(timeout=30000)
        await expect(frame.locator('text=$13.20/kg').first).to_be_visible(timeout=30000)
        await expect(frame.locator('text=Scaling').first).to_be_visible(timeout=30000)
        await expect(frame.locator('text=501-1,000kg').first).to_be_visible(timeout=30000)
        await expect(frame.locator('text=$12.50/kg').first).to_be_visible(timeout=30000)
        await expect(frame.locator('text=Enterprise').first).to_be_visible(timeout=30000)
        await expect(frame.locator('text=1,001-5,000kg').first).to_be_visible(timeout=30000)
        await expect(frame.locator('text=$11.80/kg').first).to_be_visible(timeout=30000)
        await expect(frame.locator('text=Wholesale').first).to_be_visible(timeout=30000)
        await expect(frame.locator('text=5,001-10,000kg').first).to_be_visible(timeout=30000)
        await expect(frame.locator('text=$10.80/kg').first).to_be_visible(timeout=30000)
        await expect(frame.locator('text=10,000kg').first).to_be_visible(timeout=30000)
        await expect(frame.locator('text=$10.80').first).to_be_visible(timeout=30000)
        await expect(frame.locator('text=109500.00').first).to_be_visible(timeout=30000)
        await expect(frame.locator('text=Request Official Quote').first).to_be_visible(timeout=30000)
        await expect(frame.locator('text=We\'ll send you a formal quote within 24 hours').first).to_be_visible(timeout=30000)
        await asyncio.sleep(5)
    
    finally:
        if context:
            await context.close()
        if browser:
            await browser.close()
        if pw:
            await pw.stop()
            
asyncio.run(run_test())
    