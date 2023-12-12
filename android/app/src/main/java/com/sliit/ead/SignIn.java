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
import android.widget.TextView;
import android.widget.Toast;

import com.android.volley.DefaultRetryPolicy;
import com.android.volley.Request;
import com.android.volley.RequestQueue;
import com.android.volley.Response;
import com.android.volley.VolleyError;
import com.android.volley.toolbox.StringRequest;
import com.android.volley.toolbox.Volley;

import org.json.JSONException;
import org.json.JSONObject;

public class SignIn extends AppCompatActivity {
    TextView signUp;
    Button submit;
    EditText email,password;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_sign_in);

        email = findViewById(R.id.signInEmail);
        password = findViewById(R.id.signInPassword);
        submit = findViewById(R.id.signInBtn);
        signUp = findViewById(R.id.signInSignUp);

        signUp.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                startActivity(new Intent(SignIn.this,SignUp.class));
            }
        });

        submit.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                if(!(email.getText().toString().equals("")||email.getText().toString().equals(null))){
                    if(!(password.getText().toString().equals("")||password.getText().toString().equals(null))){

                        String url = localIpAddress+"api/Users/login/"+email.getText().toString()+"/"+password.getText().toString();

                        StringRequest sr = new StringRequest(Request.Method.GET, url,
                                new Response.Listener<String>() {
                                    @Override
                                    public void onResponse(String response) {
                                        if(response.equals("User not found")){
                                            Toast.makeText(SignIn.this,response,Toast.LENGTH_LONG).show();
                                        } else if (response.equals("Unsuccessful")) {
                                            Toast.makeText(SignIn.this,"Wrong Password!",Toast.LENGTH_LONG).show();
                                        }else {

                                            try {
                                                JSONObject obj = new JSONObject(response);
                                                if(obj.getString("activation").equals("true")&&obj.getString("privilege").equals("User")){
                                                    SharedPreferences preferences = getSharedPreferences("user_data", Context.MODE_PRIVATE);
                                                    SharedPreferences.Editor editor = preferences.edit();
                                                    editor.putString("id", obj.getString("id"));
                                                    editor.putString("fname", obj.getString("fname"));
                                                    editor.putString("lname", obj.getString("lname"));
                                                    editor.putString("nic", obj.getString("nic"));
                                                    editor.putString("email", obj.getString("email"));
                                                    editor.putString("password", obj.getString("password"));
                                                    editor.putString("privilege", obj.getString("privilege"));
                                                    editor.putString("activation", obj.getString("activation"));
                                                    editor.apply();

                                                    Toast.makeText(SignIn.this,"SignIn Successful!",Toast.LENGTH_LONG).show();
                                                    startActivity(new Intent(SignIn.this,Dashboard.class));
                                                    finish();
                                                }else if(!obj.getString("privilege").equals("User")){
                                                    Toast.makeText(SignIn.this,"Use WEB App!",Toast.LENGTH_LONG).show();
                                                }else if(obj.getString("activation").equals("false")){
                                                    Toast.makeText(SignIn.this,"Your Account Deactivated!",Toast.LENGTH_LONG).show();
                                                }
                                            } catch (JSONException e) {
                                                throw new RuntimeException(e);
                                            }

                                        }
                                    }
                                }, new Response.ErrorListener() {
                            @Override
                            public void onErrorResponse(VolleyError error) {
                                if(error.networkResponse.statusCode == 404){
                                    Toast.makeText(SignIn.this,"Existing NIC",Toast.LENGTH_LONG).show();
                                }else{
                                    Toast.makeText(SignIn.this,"SignIn Unsuccessful!",Toast.LENGTH_LONG).show();
                                }
                                System.out.println(error);
                            }
                        }) {

                            @Override
                            public String getBodyContentType() {
                                return "application/json";
                            }
                        };
                        RequestQueue requestQueue= Volley.newRequestQueue(SignIn.this);
                        sr.setRetryPolicy(new DefaultRetryPolicy(
                                50000,
                                DefaultRetryPolicy.DEFAULT_MAX_RETRIES,
                                DefaultRetryPolicy.DEFAULT_BACKOFF_MULT));
                        requestQueue.add(sr);
                    }else{
                        Toast.makeText(SignIn.this,"Required Password!",Toast.LENGTH_LONG).show();
                    }
                }else{
                    Toast.makeText(SignIn.this,"Required Email!",Toast.LENGTH_LONG).show();
                }
            }
        });

    }
}