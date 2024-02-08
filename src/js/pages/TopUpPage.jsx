import React from "react";
import { useState, useEffect } from 'react';
import {TextInput, Checkbox, Card, Text, Badge, Button, Group } from '@mantine/core';
import { NavLink } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { fetchEndpoint } from "../Globals";
import { useForm } from '@mantine/form';

export default function TopUpPage() {
    
    
    const [profileData, setProfileData] = useState({
        profile: []
      });
      const navigate = useNavigate();
      const formatCurrency = (amount) => {
        return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(amount);
      }

      useEffect(() => {
        const fetchData = async () => {
          const profileResponse = (await fetchEndpoint("profile")).data;
          if (profileResponse == null) {
            navigate("/login");
            return;
          }

          setProfileData({
            profile: profileResponse
          });
        }
        fetchData();
      }, []);
      const form = useForm({
        initialValues: {
          amount: '',
          termsOfService: false,
        }  });

    return (
      <span style={{width:10}}>
  
      <Card className="regpage" mt={100} fullWidth={100} shadow="sm" padding="lg" radius="md" withBorder>
  
  
        <Group justify="space-between" mt="lg" mb="xs">
          <Text fw={900}>Válassz az alábbi fizetési módok közül!</Text>
          <Badge color="pink">Adataid biztonságban vannak</Badge>
        </Group>
        <br />
  <div>
        <Checkbox
      label="Bankkártyás fizetés"
      description="Ezzel a fizetési móddal +10% jóváírásra kerül az egyenlegedre."
      color="teal"
      size="lg"
    />
        </div>
        <br></br>
        <Checkbox

      label="PaySafeCard"
      description="Pötyögd be a hátoldalán található kódot, és már pörgethetsz is!"
      color="teal"
      size="lg"
    />
        <br></br>
        <Checkbox
      label="Paypal"
      description="Ezzel a fizetési móddal +15% jóváírásra kerül az egyenlegedre."
      color="teal"
      size="lg"
    />
            <br></br>
        <Checkbox
      label="Fizess skinekkel"
      description="Van néhány skined, amire nincs szükséged már, és szerencsét próbálnál? Akkor ez a te választásod!"
      color="teal"
      size="lg"
    />
          <br />
          <Text fw={900}>Egyenleged: {formatCurrency(profileData.profile.balance)}</Text>
      <br />
      <br />

      <NavLink to="/profile">
      <Button variant="gradient"
      gradient={{ from: 'grape', to: 'indigo', deg: 89 }}fullWidth mt="md" radius="lg" >
        Vissza
      </Button>
      </NavLink>
      <br />
      <br />
      <form onSubmit={form.onSubmit((values) => console.log(values))}>
        <TextInput
          withAsterisk
          label="Befizetni kívánt összeg"
          placeholder="100$"
          {...form.getInputProps('amount')}
        />

        <Checkbox
          mt="md"
          color="teal"
          label="Elfogadom az Adatvédelmi és Általános Szerződési Feltételeket, beleértve, hogy adataim nem kerülnek publikálásra, és biztonságban lesznek."
          {...form.getInputProps('termsOfService', { type: 'checkbox' })}
        />

        <Group justify="flex-end" mt="md">
          <Button type="submit" variant="gradient"
      gradient={{ from: 'grape', to: 'indigo', deg: 89 }} radius="lg">Befizetés</Button>
        </Group>
      </form>
      </Card>

      </span>
  
    );
  }