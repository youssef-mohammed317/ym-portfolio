$headers = @{ 'User-Agent' = 'Mozilla/5.0' }

try {
    $user = Invoke-RestMethod -Uri "https://api.github.com/users/Youssef-Mohammed317" -Headers $headers
    Write-Output "=== USER ==="
    $user | Select-Object login, name, bio, public_repos, followers, location, email, blog | Format-List | Out-String | Write-Output
} catch {
    Write-Output "User error: $_"
}

try {
    $repos = Invoke-RestMethod -Uri "https://api.github.com/users/Youssef-Mohammed317/repos?per_page=100&sort=updated" -Headers $headers
    Write-Output "=== USER REPOS ($( $repos.Count )) ==="
    foreach ($r in $repos) {
        Write-Output "$($r.name) | $($r.html_url) | $($r.language) | $($r.description)"
    }
} catch {
    Write-Output "Repos error: $_"
}

# Also check organizations
$knownOrgs = @("ym-harsha-ecommerce-microservices", "ym-udemy-dotnet-path", "ym-route-backend-diploma", "ym-dev-studio")
foreach ($org in $knownOrgs) {
    try {
        $orgRepos = Invoke-RestMethod -Uri "https://api.github.com/orgs/$org/repos?per_page=100&sort=updated" -Headers $headers
        Write-Output "=== ORG: $org ($($orgRepos.Count) repos) ==="
        foreach ($r in $orgRepos) {
            Write-Output "$($r.name) | $($r.html_url) | $($r.language) | $($r.description)"
        }
    } catch {
        Write-Output "Org $org error: $_"
    }
}
