"""Browser regression checks. Run with Playwright Python; defaults to local dev."""
import os, json
from playwright.sync_api import sync_playwright
URL=os.environ.get('ASSESSMENT_QA_URL','http://127.0.0.1:3101')+'/capability-profile/start'
KEY='ng.capability-profile.v1'
with sync_playwright() as p:
 browser=p.chromium.launch(headless=True)
 context=browser.new_context(viewport={'width':390,'height':844},reduced_motion='reduce')
 page=context.new_page();errors=[];page.on('pageerror',lambda e:errors.append(str(e)))
 page.goto(URL,wait_until='domcontentloaded');page.wait_for_load_state('networkidle')
 page.get_by_role('button',name='Begin',exact=True).click();page.wait_for_timeout(250)
 def focus_visible():
  assert page.locator('h1').evaluate('(e)=>e===document.activeElement')
  box=page.locator('h1').bounding_box();assert box['y']>=64 and box['y']<500,box
 focus_visible()
 first=page.locator('h1').inner_text()
 page.get_by_role('button',name='Usually true',exact=True).dblclick(delay=20);page.wait_for_timeout(250)
 assert page.get_by_role('progressbar').get_attribute('aria-valuenow')=='1'
 focus_visible();second=page.locator('h1').inner_text();assert first!=second
 # Back cancels a pending answer advance; no delayed navigation after going back.
 page.get_by_role('button',name='Rarely true',exact=True).click()
 page.get_by_role('button',name='← Back',exact=True).click();page.wait_for_timeout(300)
 assert page.locator('h1').inner_text()==first
 page.keyboard.press('1');page.wait_for_timeout(250)
 assert page.locator('h1').inner_text()==second
 page.reload(wait_until='domcontentloaded');page.wait_for_load_state('networkidle');focus_visible();assert page.locator('h1').inner_text()==second
 for i in range(23):
  page.keyboard.press(str(i%5+1));page.wait_for_timeout(230)
 assert page.get_by_role('progressbar').get_attribute('aria-valuenow')=='24'
 focus_visible()
 page.get_by_role('button',name='← Back',exact=True).click();page.wait_for_timeout(250);focus_visible();page.keyboard.press('5');page.wait_for_timeout(250)
 for i,value in enumerate([1,10,5,9]):
  assert page.get_by_role('progressbar').get_attribute('aria-valuenow')==str(24+i)
  page.get_by_role('button',name=f'Set demand to {value}',exact=True).click()
  assert page.get_by_role('slider').input_value()==str(value)
  assert page.get_by_role('button',name=f'Set demand to {value}',exact=True).bounding_box()['height']>=44
  page.get_by_role('button',name='Next' if i<3 else 'See my profile',exact=True).dblclick(delay=20);page.wait_for_timeout(250)
 assert page.get_by_role('progressbar').get_attribute('aria-valuenow')=='28'
 page.wait_for_timeout(1600);focus_visible()
 saved=json.loads(page.evaluate('(key)=>localStorage.getItem(key)',KEY));assert saved['completedAt']
 assert len(saved['answers'])==24 and len(saved['demands'])==4
 assert set(saved['answers'].values())=={1,3,5.5,8,10}
 page.reload(wait_until='domcontentloaded');page.wait_for_load_state('networkidle')
 assert json.loads(page.evaluate('(key)=>localStorage.getItem(key)',KEY))['completedAt']==saved['completedAt']
 # Invalid values, forged completion, and out-of-range indexes resume at missing question.
 broken={**saved,'stage':'result','index':999,'answers':{next(iter(saved['answers'])):99}}
 page.evaluate('([key,value])=>localStorage.setItem(key,JSON.stringify(value))',[KEY,broken]);page.reload(wait_until='domcontentloaded');page.wait_for_load_state('networkidle')
 assert page.get_by_role('progressbar').get_attribute('aria-valuenow')=='0'
 assert page.locator('h1').inner_text()==first
 page.evaluate('(key)=>localStorage.setItem(key,"{")',KEY);page.reload(wait_until='domcontentloaded');page.wait_for_load_state('networkidle')
 assert page.get_by_role('button',name='Begin',exact=True).is_visible()
 assert not errors,errors
 print('PASS: mobile focus/scroll; double activation; Back cancellation; all choices; all 28 progress boundaries; demand endpoints; reload; stable completion; corrupt storage.')
 context.close();browser.close()
