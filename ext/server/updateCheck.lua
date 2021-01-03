-- Code from https://gitlab.com/n4gi0s/vu-mapvote by N4gi0s
-- Modified for general use by GreatApo


-- Add current mod version
local localModVersion = "1.0.6" --temp fix, waiting for API to get version from mod.json
-- Project URL
local projectURL = "https://github.com/kapraran/vu-compass"
-- Add check URL
local checkURL = "https://raw.githubusercontent.com/kapraran/vu-compass/master/mod.json"

-- Show up-to-date message
local showUptodateMsg = true

-- Check last version code
function getCurrentVersion()
	options = HttpOptions({}, 10);
	options.verifyCertificate = false; --ignore cert for wine users
	res = Net:GetHTTP(checkURL, options);
	if res.status ~= 200 then
		return nil;
	end
	json = json.decode(res.body);
	
	if json.Version ~= nil then
		return json.Version;
	elseif json.tag_name ~= nil then
		return json.tag_name:gsub(" ", ""):gsub("^v", "")
	else
		return nil
	end
end

function checkVersion()
	local currentVersion = getCurrentVersion()
	
	if currentVersion == nil then
		print("Could not verify if this mod is out of date. You can check manually at " .. projectURL);
    elseif currentVersion ~= localModVersion then
		print("This mod seems to be out of date! Please visit " .. projectURL);
    elseif currentVersion == localModVersion and showUptodateMsg then
		print("This mod is up-to-date (version " .. currentVersion .. ")");
	end
end

checkVersion();