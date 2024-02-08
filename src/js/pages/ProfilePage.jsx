import React, { useEffect, useState } from "react";
import { fetchEndpoint } from "../Globals";
import { useNavigate } from "react-router-dom";

export default function ProfilePage() {
  const [profileData, setProfileData] = useState({
    profile: [],
    inventory: []
  });
  const navigate = useNavigate();
  const [caseData, setCaseData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const profileResponse = (await fetchEndpoint("profile")).data;
      if (profileResponse == null) {
        navigate("/login");
        return;
      }

      const inventoryResponse = (await fetchEndpoint("inventory")).data;
      if (inventoryResponse == null) {
        navigate("/login");
        return;
      }
      
      const casesResponse = (await fetchEndpoint("cases")).data;
      if (casesResponse == null) {
        navigate("/login");
        return;
      }
      
      setProfileData({
        profile: profileResponse,
        inventory: inventoryResponse
      });

      setCaseData(casesResponse);
    }
    fetchData();
  }, []);

  // Függvény a dollár formátum létrehozásához
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(amount);
  }

  return (
    <>
      <nav class="navbar navbar-sticky-top navbar-expand-lg navbar-dark bg-dark">
        <a class="navbar-brand">Üdvözlünk {profileData.profile.username}!</a>
        <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarText" aria-controls="navbarText" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarText">
          <ul class="navbar-nav mr-auto">
            <li class="nav-item active">
              <a class="nav-link" href="#">Kezdőlap</a>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="#">Profil</a>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="/topup">Töltsd fel az egyenleged!</a>
            </li>
          </ul>
          <span class="navbar-text">
            Egyenleged: {formatCurrency(profileData.profile.balance)}
          </span>
        </div>
      </nav>
      <h2 className="welcome">Megszerzett tárgyak: ({profileData.inventory.length} db)</h2>
      {profileData.inventory.map(item => {
        return [
          <div key={item.id} data-cy="inventory-item">

          </div>
        ]
      })}

      <h2 className="welcome">Összes láda: ({caseData.length} db)</h2>
      {caseData.map(_case => {
        return (
          <div key={_case.caseId} data-cy="case">
            <h1>{_case.caseName} (has {_case.items.length} items)</h1>
          </div>
        )
      })}
    </>
  )
}
