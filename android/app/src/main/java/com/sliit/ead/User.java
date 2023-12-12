package com.sliit.ead;

import static com.sliit.ead.local.localIpAddress;

import androidx.appcompat.app.AppCompatActivity;

import android.content.Context;
import android.content.Intent;
import android.content.SharedPreferences;
import android.os.Bundle;
import android.view.View;
import android.widget.Button;
import android.widget.EditText;
import android.widget.Toast;

import com.android.volley.AuthFailureError;
import com.android.volley.DefaultRetryPolicy;
import com.android.volley.Request;
import com.android.volley.RequestQueue;
import com.android.volley.Response;
import com.android.volley.VolleyError;
import com.android.volley.toolbox.StringRequest;
import com.android.volley.toolbox.Volley;

import org.json.JSONException;
import org.json.JSONObject;

public class User extends AppCompatActivity {

    Button submit;
    EditText fname,lname,email,nic,password;
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_user);

        fname = findViewById(R.id.userFname);
        lname = findViewById(R.id.userLname);
        email = findViewById(R.id.userEmail);
        nic = findViewById(R.id.userNic);
        password = findViewById(R.id.userPassword);
        submit = findViewById(R.id.userBtn);

        SharedPreferences preferences = getSharedPreferences("user_data", Context.MODE_PRIVATE);

        fname.setText(preferences.getString("fname", null));
        lname.setText(preferences.getString("lname", null));
        email.setText(preferences.getString("email", null));
        nic.setText(preferences.getString("nic", null));
        password.setText(preferences.getString("password", null));

        submit.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                if(!(fname.getText().toString().equals("")||fname.getText().toString().equals(null))){
                    if(!(lname.getText().toString().equals("")||lname.getText().toString().equals(null))){
                        if(!(email.getText().toString().equals("")||email.getText().toString().equals(null))){
                            if(!(nic.getText().toString().equals("")||nic.getText().toString().equals(null))){
                                if(!(password.getText().toString().equals("")||password.getText().toString().equals(null))){


                                    String url = localIpAddress+"api/Users/"+preferences.getString("id", null);

                                    StringRequest sr = new StringRequest(Request.Method.PUT, url,
                                            new Response.Listener<String>() {
                                                @Override
                                                public void onResponse(String response) {
                                                    SharedPreferences.Editor editor = preferences.edit();
                                                    editor.putString("fname", fname.getText().toString());
                                                    editor.putString("lname", lname.getText().toString());
                                                    editor.putString("nic", nic.getText().toString());
                                                    editor.putString("email", email.getText().toString());
                                                    editor.putString("password", password.getText().toString());
                                                    editor.apply();
                                                    Toast.makeText(User.this,"Edit Successful",Toast.LENGTH_LONG).show();
                                                    startActivity(new Intent(User.this,Dashboard.class));
                                                }
                                            }, new Response.ErrorListener() {
                                        @Override
                                        public void onErrorResponse(VolleyError error) {
                                            if(error.networkResponse.statusCode == 404){
                                                Toast.makeText(User.this,"Existing NIC",Toast.LENGTH_LONG).show();
                                            }else{
                                                Toast.makeText(User.this,"User Unsuccessful!",Toast.LENGTH_LONG).show();
                                            }
                                            System.out.println(error);
                                        }
                                    }) {
                                        @Override
                                        public byte[] getBody() throws AuthFailureError {
                                            JSONObject postData = new JSONObject();
                                            try {
                                                postData.put("id", preferences.getString("id", null));
                                                postData.put("fname", fname.getText().toString());
                                                postData.put("lname", fname.getText().toString());
                                                postData.put("nic", nic.getText().toString());
                                                postData.put("email", email.getText().toString());
                                                postData.put("password",  password.getText().toString());
                                                postData.put("privilege", "User");
                                                postData.put("activation", true);
                                            } catch (JSONException e) {
                                                e.printStackTrace();
                                            }

                                            System.out.println(postData);
                                            return postData.toString().getBytes();
                                        }

                                        @Override
                                        public String getBodyContentType() {
                                            return "application/json";
                                        }
                                    };
                                    RequestQueue requestQueue= Volley.newRequestQueue(User.this);
                                    sr.setRetryPolicy(new DefaultRetryPolicy(
                                            50000,
                                            DefaultRetryPolicy.DEFAULT_MAX_RETRIES,
                                            DefaultRetryPolicy.DEFAULT_BACKOFF_MULT));
                                    requestQueue.add(sr);

                                }else{
                                    Toast.makeText(User.this,"Required Password!",Toast.LENGTH_LONG).show();
                                }
                            }else{
                                Toast.makeText(User.this,"Required Nic!",Toast.LENGTH_LONG).show();
                            }
                        }else{
                            Toast.makeText(User.this,"Required Email!",Toast.LENGTH_LONG).show();
                        }
                    }else{
                        Toast.makeText(User.this,"Required Last Name!",Toast.LENGTH_LONG).show();
                    }
                }else{
                    Toast.makeText(User.this,"Required First Name!",Toast.LENGTH_LONG).show();
                }
            }
        });
    }
}