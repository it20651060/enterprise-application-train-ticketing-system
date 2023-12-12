package com.sliit.ead;

import static com.sliit.ead.local.localIpAddress;

import androidx.appcompat.app.AppCompatActivity;

import android.content.Intent;
import android.os.Bundle;
import android.view.View;
import android.widget.Button;
import android.widget.EditText;
import android.widget.TextView;
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

public class SignUp extends AppCompatActivity {
    Button submit;
    TextView signIn;
    EditText fname,lname,email,nic,password;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_sign_up);

        fname = findViewById(R.id.signUpFname);
        lname = findViewById(R.id.signUpLname);
        email = findViewById(R.id.signUpEmail);
        nic = findViewById(R.id.signUpNic);
        password = findViewById(R.id.signUpPassword);
        submit = findViewById(R.id.signUpBtn);
        signIn = findViewById(R.id.signUpSignIn);
        
        signIn.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                startActivity(new Intent(SignUp.this,SignIn.class));
            }
        });


        submit.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                if(!(fname.getText().toString().equals("")||fname.getText().toString().equals(null))){
                    if(!(lname.getText().toString().equals("")||lname.getText().toString().equals(null))){
                        if(!(email.getText().toString().equals("")||email.getText().toString().equals(null))){
                            if(!(nic.getText().toString().equals("")||nic.getText().toString().equals(null))){
                                if(!(password.getText().toString().equals("")||password.getText().toString().equals(null))){
    
    
                                    String url = localIpAddress+"api/Users";
    
                                    StringRequest sr = new StringRequest(Request.Method.POST, url,
                                            new Response.Listener<String>() {
                                                @Override
                                                public void onResponse(String response) {
                                                    Toast.makeText(SignUp.this,response,Toast.LENGTH_LONG).show();
                                                    startActivity(new Intent(SignUp.this,SignIn.class));
                                                    finish();
                                                }
                                            }, new Response.ErrorListener() {
                                        @Override
                                        public void onErrorResponse(VolleyError error) {
                                            if(error.networkResponse.statusCode == 404){
                                                Toast.makeText(SignUp.this,"Existing NIC",Toast.LENGTH_LONG).show();
                                            }else{
                                                Toast.makeText(SignUp.this,"Register Unsuccessful!",Toast.LENGTH_LONG).show();
                                            }
                                            System.out.println(error);
                                        }
                                    }) {
                                        @Override
                                        public byte[] getBody() throws AuthFailureError {
                                            JSONObject postData = new JSONObject();
                                            try {
                                                postData.put("fname", fname.getText().toString());
                                                postData.put("lname", lname.getText().toString());
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
                                    RequestQueue requestQueue= Volley.newRequestQueue(SignUp.this);
                                    sr.setRetryPolicy(new DefaultRetryPolicy(
                                            50000,
                                            DefaultRetryPolicy.DEFAULT_MAX_RETRIES,
                                            DefaultRetryPolicy.DEFAULT_BACKOFF_MULT));
                                    requestQueue.add(sr);
    
                                }else{
                                    Toast.makeText(SignUp.this,"Required Password!",Toast.LENGTH_LONG).show();
                                }
                            }else{
                                Toast.makeText(SignUp.this,"Required Nic!",Toast.LENGTH_LONG).show();
                            }
                        }else{
                            Toast.makeText(SignUp.this,"Required Email!",Toast.LENGTH_LONG).show();
                        }
                    }else{
                        Toast.makeText(SignUp.this,"Required Last Name!",Toast.LENGTH_LONG).show();
                    }
                }else{
                    Toast.makeText(SignUp.this,"Required First Name!",Toast.LENGTH_LONG).show();
                }
            }
        });
    }
}